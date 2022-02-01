const productModel = require('../models/product');

const jwtHelper = require('../helpers/jwt');

class ProductsController {
    static async create(req, res, next) {
        const {
            name,
            price,
            url_image
        } = req.body;
        try {
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
        const {
            name,
            price,
            url_image,
        } = req.body;
        try {
            await productModel.findOne(
                {where: {id: req.params.id}}
            )
            return res.status(200).json({
                status: 200,
                message: 'Producto actualizado con exito',
                message: name, price, url_image
            });
        } catch (error) {
            return next(error);
        }
    }

    // static async getAll(req, res, next) {
    //     try {
    //         const users = await userModel.findAll({
    //             attributes: {
    //                 exclude: ['roles_id']
    //             },
    //             include: ['role']
    //         });
    //         return res.json({
    //             status: 200,
    //             data: users
    //         });
    //     } catch (error) {
    //         return next(error);
    //     }
    // }

    // static async login(req, res) {
    //     try {
    //         const { user_name, email, password } = req.body;
    //         const user = await userModel.findOne({
    //             where: {
    //                 user_name,
    //                 email,
    //                 password
    //             },
    //             include: ['role']
    //         });
    //         if (!user) {
    //             return res.status(401).json({
    //                 status: 401,
    //                 error: 'Usuario y/o contraseña invalidos'
    //             });
    //         }
    //         const token = jwtHelper.encode({
    //             user: {
    //                 id: user.id
    //             }
    //         });
    //         return res.json({
    //             status: 200,
    //             token,
    //             admin: user.role.name === 'admin'
    //         })
    //     } catch (error) {
    //         return next(error);
    //     }
    // }
}

module.exports = ProductsController;