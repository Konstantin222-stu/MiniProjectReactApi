import {Sequelize} from 'sequelize'


const DB_NAME = process.env.DB_NAME as string;
const DB_USER = process.env.DB_USER as string;
const DB_PASSWORD = process.env.DB_PASSWORD as string;
const DB_HOST = process.env.DB_HOST as string;
const DB_PORT = process.env.DB_PORT as string;

if (!DB_NAME || !DB_USER || !DB_PASSWORD || !DB_HOST || !DB_PORT) {
    throw new Error('Missing database configuration in environment variables');
}


const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    dialect: 'mysql' as const,
    host: DB_HOST,
    port: parseInt(DB_PORT) || 3306,
});

export default sequelize;