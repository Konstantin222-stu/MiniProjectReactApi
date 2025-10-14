import { Optional } from 'sequelize';

export interface UserAttributes {
    id_user: number;
    login: string;
    password: string;
}

export interface UserCreationAttributes extends Optional<UserAttributes, 'id_user'> {}

export interface PromotionAttributes {
    id_promotion?: number;
    subdesc?: string;
    title?:string;
    desc?:string;
    price?: number;
    sale?:number;
    link?:string;
    time?: Date;
    image?: string
}

export interface ProductsAttributes{
    id_products?: number;
    title?: string;
    price?: number;
    size?: string[];
    reviews?: number;
    desc?: string;
    stars?: number;
    tags?: string[];
    category?: string;
    image?: string;
}

export interface PromotionCreationAttributes extends Optional<PromotionAttributes, 'id_promotion'> {}