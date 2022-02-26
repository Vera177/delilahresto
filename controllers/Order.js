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
                    {
                        model: productsModel,
                        as: 'products',
                        attributes: {
                            exclude: ['price']
                        }
                    },
                    'status',
                    'pay',
                ]
            });
            return res.json({
                status: 200,
                data: orders
            });
        }
        catch (error) {
            return next(error);
        }
    }

    static async getById(req, res) {
        try {
            const orders = await orderModel.findOne({
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
                where: { id: req.params.id }
            });
            return res.json({
                status: 200,
                data: orders
            });
        } catch (error) {
            return next(error);
        }
    }

    static async create(req, res, next) {
        const {
            date,
            total
        } = req.body;
        try {
            if (!date || !total) {
                throw { status: 422, message: 'date and total are required' };
            }
            await orderModel.create(
                { date, total },
                { fields: ['date', 'total '] }
            );
            return res.status(201).json({
                status: 201,
                message: 'Nuevo pedido creado'
            });
        } catch (error) {
            return next(error);
        }
    }

    static async update(req, res, next) {
        const {
            name,
            price,
            url_image,
        } = req.body;
        try {
            await orderModel.update(
                { name, price, url_image },
                { where: { id: req.params.id } }
            );
            return res.status(200).json({
                status: 200,
                message: `pedido actualizado con exito`
            });
        } catch (error) {
            return next(error);
        }
    }

    static async delete(req, res, next) {
        try {
            await orderModel.destroy(
                { where: { id: req.params.id } }
            );
            return res.status(200).json({
                status: 200,
                message: `Producto eliminado con exito`
            });
        } catch (error) {
            return next(error);
        }
    }
}

module.exports = OrdersController;