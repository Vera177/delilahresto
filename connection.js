const Sequelize = require('sequelize');

const config = require('./config');

const path = `mysql://${config.database.user}:${config.database.password}@${config.database.host}:${config.database.port}/${config.database.name}`;

const connection = new Sequelize(path);

connection.authenticate()
    .then(res => {
        console.log('DB connected!');
    })
    .catch(err => {
        console.log(err);
    });

module.exports = connection;