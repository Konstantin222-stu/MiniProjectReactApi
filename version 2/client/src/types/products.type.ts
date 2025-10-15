export type ProductTag = 'SALE' | 'HOT' | 'NEW' | string;
export type ProductSize = 'S' | 'XS' | 'L' | 'XL' | 'M' | 'XM' | string

export interface ProductBaseProps {
    src: string; 
    title: string; 
    price: number; 
    size: ProductSize[]; 
    reviews: number; 
    stars: number; 
    tags: ProductTag[];
    id: number;
}


export interface ProductCartAdminProps extends ProductBaseProps{
    edit: (id:number) => void;
    deleteP: (id: number) => void;
}


export interface ProductItem {
    id: number;
    title: string;
    desc: string;
    price: number;
    size: string[];
    reviews: number;
    stars: number;
    tags: string[];
    image: string;
}

export interface ProductResponse {
    data: ProductItem;
}