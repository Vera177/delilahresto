const orderModel = require('../models/order');
const userModel = require('../models/user');
const roleModel = require('../models/role');
const orderHasProductModel = require('../models/orders_has_products');
const jwtHelper = require('../helpers/jwt');
const productsModel = require('../models/product');

class OrdersController {

    static async getAll(req, res, next) {
        const payload = req.headers['authorization'];
        if (!payload) {
            return res.status('401').json({ message: 'Token is missing!' });
        }
        const [, token] = payload.split(' ');
        const tokenDecoded = jwtHelper.decode(token);
        if (tokenDecoded.user.role === 'user') {
            return res.status(401).json({
                status: 401,
                error: 'Usuario no autorizado'
            });
        }
        try {
            const orders = await orderModel.findAll({
                attributes: {
                    exclude: ['users_id', 'status_id', 'pay_method_id'],
                },
                include: [
                    {
                        model: userModel,
                        as: 'user',
                        attributes: {
                            exclude: ['password', 'roles_id', 'id']
                        },
                        include: [
                            {
                                model: roleModel,
                                as: 'role'
                            }]
                    },
                    'status',
                    'pay',
                ],
                raw: true,
                nest: true
            });
            const response = [...orders];
            for (let index = 0; index < response.length; index++) {
                const ordersHasProducts = await orderHasProductModel.findAll(
                    {
                        where: {
                            orders_id: response[index].id
                        },
                        raw: true,
                        nest: true
                    }
                );
                response[index].products = [];
                for (let j = 0; j < ordersHasProducts.length; j++) {
                    const element = ordersHasProducts[j];
                    const product = await productsModel.findOne({
                        where: {
                            id: element.products_id
                        },
                        raw: true,
                        nest: true
                    });
                    response[index].products.push({
                        ...product,
                        amount: element.amount
                    });
                }
            }
            return res.json({
                status: 200,
                data: response
            });
        }
        catch (error) {
            return next(error);
        }
    }

    static async getById(req, res) {
        try {
            const orders = await orderModel.findOne({
                where: { id: req.params.id },
                attributes: {
                    exclude: ['users_id', 'status_id', 'pay_method_id'],
                },
                include: [
                    {
                        model: userModel,
                        as: 'user',
                        attributes: {
                            exclude: ['password', 'roles_id', 'id']
                        },
                        include: [
                            {
                                model: roleModel,
                                as: 'role'
                            }]
                    },
                    'status',
                    'pay',
                ],
                raw: true,
                nest: true
            });
            const response = { ...orders };
            const ordersHasProducts = await orderHasProductModel.findAll(
                {
                    where: {
                        orders_id: response.id
                    },
                    raw: true,
                    nest: true
                }
            );
            response.products = [];
            for (let j = 0; j < ordersHasProducts.length; j++) {
                const element = ordersHasProducts[j];
                const product = await productsModel.findOne({
                    where: {
                        id: element.products_id
                    },
                    raw: true,
                    nest: true
                });
                response.products.push({
                    ...product,
                    amount: element.amount
                });
            }
            return res.json({
                status: 200,
                data: response
            });
        }
        catch (error) {
            return next(error);
        }
    }

    static async create(req, res, next) {
        const {
            date, users_id, pay_method_id
        } = req.body;
        const status_id = 1;
        const total = 0;
        try {
            const orderCreated = await orderModel.create({
                date, total, users_id, status_id, pay_method_id
            });
            return res.json({
                status: 201,
                data: orderCreated
            });
        }
        catch (error) {
            return next(error);
        }
    }

    static async addProductsToOrder(req, res, next) {
        try {
            const { orderId, productId } = req.params;
            const { amount } = req.body;
            const order = await orderModel.findByPk(orderId, {
                include: ["products"]
            });
            if (!order) {
                return res.status(404).json({
                    message: 'order not found'
                });
            }
            const product = await productsModel.findByPk(productId);
            if (!product) {
                return res.status(404).json({
                    message: 'product not found'
                });
            }
            await orderHasProductModel.create({
                amount, products_id: productId, orders_id: orderId
            });
            const total = order.total + (amount * product.price);
            await order.update({ total });
            return res.status(201).json({
                data: "success"
            });
        } catch (error) {
            return next(error);
        }
    }

    static async update(req, res, next) {
        const payload = req.headers['authorization'];
        if (!payload) {
            return res.status('401').json({ message: 'Token is missing!' });
        }
        const [, token] = payload.split(' ');
        const tokenDecoded = jwtHelper.decode(token);
        if (tokenDecoded.user.role === 'user') {
            return res.status(401).json({
                status: 401,
                error: 'Usuario no autorizado'
            });
        }
        const { status_id } = req.body;
        try {
            await orderModel.update(
                { status_id },
                { where: { id: req.params.id } }
            );
            return res.status(200).json({
                status: 200,
                message: `estado del pedido actualizado con exito`
            });
        } catch (error) {
            return next(error);
        }
    }

    static async delete(req, res, next) {
        try {
            await orderHasProductModel.destroy({
                where: { orders_id: req.params.id }
            });
            await orderModel.destroy(
                { where: { id: req.params.id } }
            );
            return res.status(200).json({
                status: 200,
                message: `Orden eliminada con exito`
            });
        } catch (error) {
            return next(error);
        }
    }
}

module.exports = OrdersController;