export type ProductTag = 'SALE' | 'HOT' | 'NEW' | string;
export type ProductSize = 'S' | 'XS' | 'L' | 'XL' | 'M' | 'XM' | string;


export interface ProductApiItem {
    id_products: number;  
    image: string;        
    title: string; 
    price: number; 
    size: ProductSize[]; 
    reviews: number; 
    stars: number; 
    tags: ProductTag[];
    desc?: string;     
    category: string;   
}


export interface ProductBaseProps {
    id: number;
    src: string; 
    title: string; 
    price: number; 
    size: ProductSize[]; 
    reviews: number; 
    stars: number; 
    tags: ProductTag[];
}


export const mapApiToProductProps = (apiItem: ProductApiItem): ProductBaseProps => ({
    id: apiItem.id_products,
    src: apiItem.image,
    title: apiItem.title,
    price: apiItem.price,
    size: apiItem.size,
    reviews: apiItem.reviews,
    stars: apiItem.stars,
    tags: apiItem.tags
});

export interface ProductCartAdminProps extends ProductBaseProps {
    edit: (id: number) => void;
    deleteP: (id: number) => void;
}