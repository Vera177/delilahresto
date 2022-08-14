const productModel = require('../models/product');
const jwtHelper = require('../helpers/jwt');
const userModel = require('../models/user');

class ProductsController {

    static async getAll(req, res, next) {
        try {
            const products = await productModel.findAll();
            return res.json({
                status: 200,
                data: products
            });
        }
        catch (error) {
            return next(error);
        }
    }

    static async getById(req, res) {
        try {
            const products = await productModel.findByPk(req.params.id);
            return res.json({
                status: 200,
                data: products
            });
        } catch (error) {
            return next(error);
        }
    }

    static async create(req, res, next) {
        const headerAuth = req.headers['authorization'];
        const [, token] = headerAuth.split(' ');
        const {
            name,
            price,
            url_image
        } = req.body;
        const userFromToken = jwtHelper.decode(token);
        if (!headerAuth) {
            return res.status('401').json({ message: 'Token is missing!' });
        }
        try {
            if (userFromToken.user.admin = 'false') {
                throw { status: 401, message: 'Must be admin to proceed' };
            }
            if (!name || !price) {
                throw { status: 422, message: 'product and price are required' };
            }
            await productModel.create(
                { name, price, url_image },
                { fields: ['name', 'price', 'url_image'] }
            );
            return res.status(201).json({
                status: 201,
                message: 'Nuevo producto creado'
            });
        } catch (error) {
            return next(error);
        }
    }

    static async update(req, res, next) {
        const headerAuth = req.headers['authorization'];
        const [, token] = headerAuth.split(' ');
        const userFromToken = jwtHelper.decode(token);
        if (!headerAuth) {
            return res.status('401').json({ message: 'Token is missing!' });
        }
        const {
            name,
            price,
            url_image,
        } = req.body;
        try {
            if (userFromToken.user.admin = 'false') {
                throw { status: 401, message: 'Must be admin to proceed' };
            }
            await productModel.update(
                { name, price, url_image },
                { where: { id: req.params.id } }
            );
            return res.status(200).json({
                status: 200,
                message: `Producto actualizado con exito`
            });
        } catch (error) {
            return next(error);
        }
    }

    static async delete(req, res, next) {
        const headerAuth = req.headers['authorization'];
        const [, token] = headerAuth.split(' ');
        const userFromToken = jwtHelper.decode(token);
        if (!headerAuth) {
            return res.status('401').json({ message: 'Token is missing!' });
        }
        try {
            if (userFromToken.user.admin = 'false') {
                throw { status: 401, message: 'Must be admin to proceed' };
            }
            await productModel.destroy(
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

module.exports = ProductsController;