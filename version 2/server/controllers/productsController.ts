import { Products } from "../models/"
import { v4 as uuidv4 } from "uuid";
import path from "path"
import fs from "fs"
import ApiError from "../error"
import {Request, Response, NextFunction} from 'express'
import { CreateProductBody, UpdateProductBody } from "../types/products";

class ProductsController {
  async get(req:Request, res:Response, next:NextFunction):Promise<Response | void> {
    try {
      const products = await Products.findAll();
      return res.json(products);
    } catch (err:unknown) {
      if(err instanceof Error){
        next(ApiError.internal(err.message))
      }
      else{
        next(ApiError.internal('Неизвестная ошибка'));
      }
    }
  }

  async getID(req:Request, res:Response, next:NextFunction):Promise<Response | void> { 
    try {
      const { id } = req.params;
      const product = await Products.findByPk(id);

      if (!product) {
        return next(ApiError.notFound('Товар не найден'));
      }

      return res.json(product);
    } catch (err: unknown) {
      if(err instanceof Error){
        next(ApiError.internal(err.message));
      }
      else{
        next(ApiError.internal('Неизвестная ошибка'));
      }
      
    }
  }

  async post(req:Request, res:Response, next:NextFunction): Promise <Response | void> {
    try {
      const body = req.body as CreateProductBody

      const files = req.files as {
            image?: {
                name: string;
                mv: (path: string) => Promise<void>;
            };
      } | undefined;

       const { title, price, size, reviews, desc, stars, tags, category } = body;
      let imagePath:string | null = null ;

      if (files?.image) {
            const { image } = files;
            const fileName = uuidv4() + path.extname(image.name);
            imagePath = path.join('uploads', 'products', fileName);
            await image.mv(path.resolve(__dirname, '..', imagePath));
            imagePath = fileName;
        }

      const parsedSize = typeof size === 'string' ? JSON.parse(size) : size;
      const parsedTags = typeof tags === 'string' ? JSON.parse(tags) : tags;

      const product = await Products.create({
        title: title || undefined,
        price: price ? parseInt(price) : undefined,
        size: parsedSize || [],
        reviews: reviews ? parseInt(reviews) : 0,
        desc: desc || undefined,
        stars: stars ? parseInt(stars) : 0,
        tags: parsedTags || [],
        category: category || undefined,
        image: imagePath || undefined
      });

      return res.status(201).json(product);
    } catch (err: unknown) {
      if(err instanceof Error){
        next(ApiError.badRequest(err.message));
      }
      else{
        next(ApiError.badRequest('Неизвестная ошибка'));
      }
    }
  }

  async put(req: Request, res: Response, next:NextFunction): Promise<Response | void> {
    try {
      const { id } = req.params;
      const body = req.body as UpdateProductBody | undefined;

      const files = req.files as {
            image?: {
                name: string;
                mv: (path: string) => Promise<void>;
            };
      } | undefined;

      const product = await Products.findByPk(id);
      
      if (!product) {
        return next(ApiError.notFound('Товар не найден'));
      }

      const { title, price, size, reviews, desc, stars, tags, category } = body || {};
      let imagePath:string | null = null;

      
      if (files?.image) {
        if (product.image) {
          const oldImagePath = path.resolve(__dirname, '..', 'uploads', 'products', product.image);
          if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath);
          }
        }

        const { image } = files;
        const fileName = uuidv4() + path.extname(image.name);
        const fullPath = path.join('uploads', 'products', fileName);  
        await image.mv(path.resolve(__dirname, '..', fullPath));
        imagePath = fileName;
      }

      const updateData: Partial<{
            title: string;
            price: number;
            size: any[];
            reviews: number;
            desc: string;
            stars: number;
            tags: any[];
            category: string;
            image: string;
      }> = {};
      
      if (title !== undefined) updateData.title = title;
      if (price !== undefined) updateData.price = parseInt(price);
      if (size !== undefined) {
        updateData.size = typeof size === 'string' ? JSON.parse(size) : size;
      }
      if (reviews !== undefined) updateData.reviews = parseInt(reviews);
      if (desc !== undefined) updateData.desc = desc;
      if (stars !== undefined) updateData.stars = parseInt(stars);
      if (tags !== undefined) {
        updateData.tags = typeof tags === 'string' ? JSON.parse(tags) : tags;
      }
      if (category !== undefined) updateData.category = category;
      if (imagePath !== null) updateData.image = imagePath;

      if (Object.keys(updateData).length > 0) {
        await product.update(updateData);
      }

      return res.json(product);
    } catch (err: unknown) {
      if(err instanceof Error){
        next(ApiError.badRequest(err.message));
      }
      else{
        next(ApiError.badRequest('Неизвестная ошибка'));
      }
    }
  }

  async delete(req:Request, res:Response, next:NextFunction):Promise<Response | void> {
    try {
      const { id } = req.params;
      const product = await Products.findByPk(id);

      if (!product) {
        return next(ApiError.notFound('Товар не найден'));
      }

      if (product.image) {
        const imagePath = path.resolve(__dirname, '..', 'uploads', 'products', product.image);
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
      }

      await product.destroy();
      return res.json({ message: 'Товар успешно удален' });
    } catch (err: unknown) {
        if (err instanceof Error) {
            next(ApiError.internal(err.message));
        } else {
            next(ApiError.internal('Неизвестная ошибка'));
        }
    }
  }
}

export default new ProductsController();