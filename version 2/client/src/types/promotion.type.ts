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