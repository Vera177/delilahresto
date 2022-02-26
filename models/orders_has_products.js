const { DataTypes } = require('sequelize');

const connection = require('../connection');

const productModel = require('./product');
const ordersModel = require('./status');

const model = connection.define(
    'orders_has_products', {
        products_id: {
            type: DataTypes.INTEGER
        },
        orders_id: {
            type: DataTypes.INTEGER
        },
        amount: {
            type: DataTypes.INTEGER
        }
    }, { timestamps: false }
);

// model.belongsTo(productModel, {as: 'products', foreignKey: 'products_id'});
// model.belongsTo(ordersModel, {as: 'orders', foreignKey: 'orders_id'});

module.exports = model;