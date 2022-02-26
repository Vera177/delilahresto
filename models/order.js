const { DataTypes } = require('sequelize');

const connection = require('../connection');

const userModel = require('./user');
const statusModel = require('./status');
const payMethodModel = require('./pay_method');
const productsModel = require('./product');
const ordersHasProduct = require('./orders_has_products');

const model = connection.define(
    'orders',
    {
        date: {
            type: DataTypes.DATE
        },
        total: {
            type: DataTypes.INTEGER
        },
        users_id: {
            type: DataTypes.INTEGER
        },
        status_id: {
            type: DataTypes.INTEGER
        },
        pay_method_id: {
            type: DataTypes.INTEGER
        }
    },
    { timestamps: false }
);

model.belongsTo(userModel, { as: 'user', foreignKey: 'users_id' });
model.belongsTo(statusModel, { as: 'status', foreignKey: 'status_id' });
model.belongsTo(payMethodModel, { as: 'pay', foreignKey: 'pay_method_id' });

module.exports = model;