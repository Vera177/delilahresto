const { DataTypes } = require('sequelize');

const connection = require('../connection');

const model = connection.define(
    'pay_methods',
    {
        name: {
            type: DataTypes.STRING
        }
    },
    { timestamps: false }
);

module.exports = model;