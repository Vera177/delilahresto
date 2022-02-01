const { DataTypes } = require('sequelize');

const connection = require('../connection');

const model = connection.define(
    'products',
    {
        name: {
            type: DataTypes.STRING
        },
        price: {
            type: DataTypes.INTEGER
        },
        url_image: {
            type: DataTypes.STRING
        }
    },
    { timestamps: false }
);

module.exports = model;