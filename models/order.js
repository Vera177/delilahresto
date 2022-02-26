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
// model.belongsToMany(productsModel, { through: 'orders_has_products', as: 'products', foreignKey: 'products_id' });
// productsModel.belongsToMany(model, { through: 'orders_has_products', as: 'orders', foreignKey: 'orders_id' });
model.hasMany(ordersHasProduct, { foreignKey: 'products_id', as: 'products' });
ordersHasProduct.belongsTo(model, { foreignKey: 'products_id', as: 'product' });


//una orden puede tener muchos productos, y muchos productos puede tener una orden

module.exports = model;