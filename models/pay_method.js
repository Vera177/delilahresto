const { DataTypes } = require('sequelize');

const connection = require('../connection');

const model = connection.define(
    'pay_method',
    {
        name: {
            type: DataTypes.STRING
        }
    },
    { timestamps: false }
);

module.exports = model;