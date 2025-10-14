const {Sequelize} = require('sequelize')

module.exports = new Sequelize(
    DB_NAME = process.env.DB_NAME,
    DB_USER = process.env.DB_USER,
    DB_PASSWORD = process.env.DB_PASSWORD,
    {
        dialect:'mysql',
        host:process.env.DB_HOST,
        port:process.env.DB_PORT
    }
)