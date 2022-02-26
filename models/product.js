const { DataTypes } = require('sequelize');

const connection = require('../connection');
const ordersModel = require('./order');
const ordersHasProduct = require('./orders_has_products');

const productsModel = connection.define(
    'products', {
    name: {
        type: DataTypes.STRING
    },
    price: {
        type: DataTypes.INTEGER
    },
    url_image: {
        type: DataTypes.STRING
    }
}, { timestamps: false }
);

ordersModel.belongsToMany(productsModel, { through: ordersHasProduct, as: 'products', foreignKey: 'products_id', constraints: false });
productsModel.belongsToMany(ordersModel, { through: ordersHasProduct, as: 'orders', foreignKey: 'orders_id', constraints: false });

module.exports = productsModel;
