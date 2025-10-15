export interface PromotionBaseProps{
    id?: number;
    subdesc: string;
    title: string;
    desc: string;
    price: number;
    sale: number;
    link: string;
    time: number;
    src: string
}

export interface PromotionAdminCardProps extends PromotionBaseProps{
    id: number;
    edit: (id:number) => void;
}

export interface FormattedTime{
    days: string;
    hours: string;
    minutes: string;
    seconds: string;
}

export interface PromotionItem {
    id_promotion: number;
    subdesc: string;
    title: string;
    desc: string;
    price: number;
    sale: number;
    link: string;
    timeLeft: number; 
    image: string;
    time: string; 
}

export interface PromotionResponse {
    data: PromotionItem[];
}

export interface PromotionFormData{
    title: string;
    subdesc: string;
    desc: string;
    price: string;
    sale: string;
    link: string;
    time: string;
}

export interface EditPromotionFormData{
    title: string;
    price: string;
    subdesc: string;
    desc: string;
    sale: string;
    link: string;
    time: string;
}