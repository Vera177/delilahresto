const orderModel = require('../models/order');
const userModel = require('../models/user');
const roleModel = require('../models/role');
const orderHasProductModel = require('../models/orders_has_products');
const jwtHelper = require('../helpers/jwt');
const productsModel = require('../models/product');

class OrdersController {

    static async getAll(req, res, next) {
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
            const number = req.params.id
            const idOrder = response[number - 1]
            return res.json({
                status: 200,
                data: idOrder
            });
        }
        catch (error) {
            return next(error);
        }
    }

    static async create(req, res, next) {
        const {
            date, total, users_id, status_id, pay_method_id, amount, products_id, orders_id
        } = req.body;
        try {
            await orderModel.create({
                date, total, users_id, status_id, pay_method_id
            });
            await orderHasProductModel.create({
                amount, products_id, orders_id
            });
            return res.json({
                status: 201,
                data: "¡Recibimos tu pedido!"
            });
        }
        //ORDERS_ID DEBE SER AUTOINCREMENTAL Y CHEQUEAR POR QUÉ NÚMERO VA [...orders] quizá?
        //HACER LÓGICA PARA AMOUNT Y TOTAL
        catch (error) {
            return next(error);
        }
    }

    static async update(req, res, next) {
        const {
            status_id
        } = req.body;
        try {
            await orderModel.update(
                { status_id },
                { where: { id: req.params.id } }
            );
            console.log(status_id);
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
                where: {orders_id : req.params.id}
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