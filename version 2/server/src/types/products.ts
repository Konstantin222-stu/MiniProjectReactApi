import type { Request } from 'express';
import type { UploadedFile } from 'express-fileupload';

export interface CreateProductBody {
    title?: string;
    price?: string;
    size?: string | any[];
    reviews?: string;
    desc?: string;
    stars?: string;
    tags?: string | any[];
    category?: string;
}

export interface UpdateProductBody {
    title?: string;
    price?: string;
    size?: string | any[];
    reviews?: string;
    desc?: string;
    stars?: string;
    tags?: string | any[];
    category?: string;
}


export interface ProductFileRequest extends Request {
    body: CreateProductBody | UpdateProductBody;
    files?: {
        image?: UploadedFile;
    };
}