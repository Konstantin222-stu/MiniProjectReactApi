import type { UserAttributes, UserCreationAttributes, PromotionAttributes, ProductsAttributes, PromotionCreationAttributes } from '../types/model';
import sequelize from './db';
import { DataTypes, Model} from 'sequelize';
import type { Optional } from 'sequelize';


class User extends Model <UserAttributes, UserCreationAttributes> implements UserAttributes{
    public id_user!: number;
    public login!: string;
    public password!: string; 
}

User.init({
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
    }},
    { 
    sequelize,
    tableName: 'users',  
    timestamps: false 
}); 


class Promotion extends Model<PromotionAttributes, PromotionCreationAttributes> implements PromotionAttributes{
    public id_promotion!: number;
    public subdesc?: string;
    public title?:string;
    public desc?:string;
    public price?: number;
    public sale?:number;
    public link?:string;
    public time?: Date;
    public image?: string
}

Promotion.init({
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
},{
    sequelize,
    tableName: 'promotions', 
    timestamps: false 
})

class Products extends Model<ProductsAttributes> implements ProductsAttributes {
    public id_products!: number;
    public title?: string;
    public price?: number;
    public size?: string[];
    public reviews?: number;
    public desc?: string;
    public stars?: number;
    public tags?: string[];
    public category?: string;
    public image?: string;
}

Products.init({
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
    image:DataTypes.STRING(150),  
},{
    sequelize,
    tableName: 'products', 
    timestamps: false 
})
    

export {
    sequelize,
    User,
    Promotion,
    Products
};