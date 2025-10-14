
import { Request } from 'express';


export type CreatePromotionRequest = Request & {
    body: CreatePromotionBody;
    files?: {
        image?: {
            name: string;
            mv: (path: string) => Promise<void>;
        };
    };
};

export type UpdatePromotionRequest = Request & {
    body: UpdatePromotionBody;
    params: {
        id: string;
    };
    files?: {
        image?: {
            name: string;
            mv: (path: string) => Promise<void>;
        };
    };
};


export interface PromotionWithTimeLeft {
    id_promotion: number;
    subdesc?: string;
    title?: string;
    desc?: string;
    price?: number;
    sale?: number;
    link?: string;
    time?: Date;
    image?: string;
    timeLeft: number;
}

export interface CreatePromotionBody {
    subdesc?: string;
    title?: string;
    desc?: string;
    price?: string;
    sale?: string;
    link?: string;
    time?: string;
}

export interface UpdatePromotionBody {
    subdesc?: string;
    title?: string;
    desc?: string;
    price?: string;
    sale?: string;
    link?: string;
    time?: string;
}