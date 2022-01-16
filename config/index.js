require('dotenv').config();

module.exports = {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3000,
    database: {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 3306,
        name: process.env.DB_NAME || 'delilah_resto',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || ''
    },
    jwt_secret: process.env.JWT_SECRET || 'secret'
};