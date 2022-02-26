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

// ordersModel.belongsToMany(productsModel, { through: ordersHasProduct, as: 'products', foreignKey: 'products_id', constraints: false });
// productsModel.belongsToMany(ordersModel, { through: ordersHasProduct, as: 'orders', foreignKey: 'orders_id', constraints: false });

module.exports = productsModel;

// amount = cant de de un mismo que agregué en una orden. Multiplicar precio de producto * amount. Ese es precio total de la orden.
// total = products.price * orders_has_products.amount. Esto lo sumo por cada producto que esté en la orden.
// Esto se hace cada vez que agrego un producto o una orden. orders.total +=[para sumar al valor del total] order
// El total es un acumulador. Cada vez que sumo un producto, hace update a ese producto. Por cada nueva orden, le sumo el total de ese producto que agrego.