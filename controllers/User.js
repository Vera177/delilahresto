const userModel = require('../models/user');

const jwtHelper = require('../helpers/jwt');

class UserController {
    static async create(req, res, next) {
        const {
            user_name,
            name,
            email,
            password,
            phone,
            address,
            roles_id
        } = req.body;
        try {
            if (!name) {
                throw { status: 422, message: 'input name is missing' };
            }
            await userModel.create(
                { user_name, name, email, password, phone, address, roles_id },
                { fields: ['user_name', 'name', 'email', 'password', 'phone', 'address', 'roles_id'] }
            );
            return res.status(201).json({
                status: 201,
                message: 'Usuario creado'
            });
        } catch (error) {
            return next(error);
        }
    }

    static async getAll(req, res, next) {
        try {
            const users = await userModel.findAll({
                attributes: {
                    exclude: ['roles_id']
                },
                include: ['role']
            });
            return res.json({
                status: 200,
                data: users
            });
        } catch (error) {
            return res.status(500).json({
                status: 500,
                error: 'Internal server error'
            })
        }
    }

    static async login(req, res) {
        try {
            const { email, password } = req.body;
            const user = await userModel.findOne({
                where: {
                    email,
                    password
                },
                include: ['role']
            });
            if (!user) {
                return res.status(401).json({
                    status: 401,
                    error: 'Usuario y/o contraseña invalidos'
                });
            }
            const token = jwtHelper.encode({
                user: {
                    id: user.id
                }
            });
            return res.json({
                status: 200,
                token,
                admin: user.role.name === 'admin'
            })
        } catch (error) {
            return res.status(500).json({
                status: 500,
                error: 'Internal server error'
            })
        }
    }
}

module.exports = UserController;