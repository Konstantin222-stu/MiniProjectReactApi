const sequelize = require('./db');
const { DataTypes } = require('sequelize');


const User = sequelize.define('User', {
    id_user: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
    },
    login: { 
        type: DataTypes.STRING(50), 
        allowNull: false,
        unique: true 
    },
    password: { 
        type: DataTypes.STRING(250), 
        allowNull: false 
    },
}, { 
    tableName: 'users',  
    timestamps: false 
});

const Promotion = sequelize.define('Promotion', {
    id_promotion: {  
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
    },
    subdesc: { type: DataTypes.STRING(20) },
    title: { type: DataTypes.STRING(50) }, 
    desc: { type: DataTypes.TEXT }, 
    price: { type: DataTypes.INTEGER },
    sale: { type: DataTypes.INTEGER },
    link: { type: DataTypes.STRING(50) },
    time: { type: DataTypes.DATE },
    image: { type: DataTypes.STRING(100) }, 
}, { 
    tableName: 'promotions', 
    timestamps: false 
});

const Products = sequelize.define('Products', {
    id_products: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
    },
    title: DataTypes.STRING(30),
    price: DataTypes.INTEGER,
     size: {
        type: DataTypes.JSON,
        defaultValue: []
    },
    reviews: DataTypes.INTEGER,
    desc: DataTypes.STRING(200),
    stars:DataTypes.INTEGER,
    tags: {
        type: DataTypes.JSON,
        defaultValue: []
    },
    category: DataTypes.STRING(30),
    
}, { 
    tableName: 'products', 
    timestamps: false 
});




module.exports = {
    sequelize,
    User,
    Promotion,
    Products
};