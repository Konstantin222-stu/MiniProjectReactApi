import { Promotion } from "../models"
import { v4 as uuidv4 } from "uuid";
import path from "path"
import fs from "fs"
import ApiError from "../error"
import type {Response, Request, NextFunction} from 'express'
import type {UpdatePromotionBody, CreatePromotionRequest, UpdatePromotionRequest } from "../types/promotion";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class PromotionController {
  async get(req:Request, res:Response, next:NextFunction):Promise<Response | void> {
    try {
      const promotions = await Promotion.findAll();
      
      const promotionsWithTimeLeft = promotions.map(promotion => {
        const promotionData = promotion.get({ plain: true });
        
        const timeEnd = promotionData.time ? new Date(promotionData.time) : new Date();
        const now = new Date();
        const timeLeftSeconds = Math.max(0, Math.floor((timeEnd.getTime() - now.getTime()) / 1000));
        
        return {
          ...promotionData,
          timeLeft: timeLeftSeconds  
        };
      });

      return res.json(promotionsWithTimeLeft);
    } catch (err: unknown) {
      if(err instanceof Error){
        next(ApiError.internal(err.message))
      }
      else{
        next(ApiError.badRequest("Неизвестная ошибка"));
      }
    }
  }

  async post(req:CreatePromotionRequest, res:Response, next:NextFunction): Promise <Response | void> {
    try {
      const { subdesc, title, desc, price, sale, link, time } = req.body;
      let imagePath: string | null = null;

      if (req.files?.image) {
        const { image } = req.files;
        const fileName = uuidv4() + path.extname(image.name);
        imagePath = path.join('uploads', 'promotion', fileName);
        await image.mv(path.resolve(__dirname, '..', imagePath));
        imagePath = fileName;
      }

        const promotionDataNew: any = {
      ...(subdesc && { subdesc }),
      ...(title && { title }),
      ...(desc && { desc }),
      ...(price && { price: parseInt(price) }),
      ...(sale && { sale: parseInt(sale) }),
      ...(link && { link }),
      ...(time && { time: new Date(time) }),
      ...(imagePath && { image: imagePath })
    };

    const promotion = await Promotion.create(promotionDataNew);


      const promotionData = promotion.get({ plain: true });
      const timeEnd = promotionData.time ? new Date(promotionData.time): new Date();
      const now = new Date();
      const timeLeftSeconds = Math.max(0, Math.floor((timeEnd.getTime() - now.getTime()) / 1000));

      return res.status(201).json({
        ...promotionData,
        timeLeft: timeLeftSeconds
      });
    } catch (err: unknown) {
      if(err instanceof Error){
        next(ApiError.badRequest(err.message))
      }
      else{
        next(ApiError.badRequest('Неизвестная ошибка'));
      }
    }
  }

  async put(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { id } = req.params;
      const body = req.body as UpdatePromotionBody;
      const files = req.files as {
        image?: {
          name: string;
          mv: (path: string) => Promise<void>;
       };
      } | undefined;
              
      const promotion = await Promotion.findByPk(id);
              
      if (!promotion) {
        return next(ApiError.notFound('Акция не найдена'));
      }

      const { subdesc, title, desc, price, sale, link, time } = body || {};
      let imagePath: string | null = null;

      if (files?.image) {    
        if (promotion.image) {
          const oldImagePath = path.resolve(__dirname, '..', 'uploads', 'promotion', promotion.image);
          if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath);
          }
        }

        const { image } = files;
        const fileName = uuidv4() + path.extname(image.name);
        const fullPath = path.join('uploads', 'promotion', fileName);
                  
        await image.mv(path.resolve(__dirname, '..', fullPath));
          imagePath = fileName;
        }

        const updateData: Partial<{
          subdesc: string;
          title: string;
          desc: string;
          price: number;
          sale: number;
          link: string;
          time: Date;
          image: string;
        }> = {};
        
        if (subdesc !== undefined) updateData.subdesc = subdesc;
        if (title !== undefined) updateData.title = title;
        if (desc !== undefined) updateData.desc = desc;
        if (price !== undefined) updateData.price = parseInt(price);
        if (sale !== undefined) updateData.sale = parseInt(sale); 
        if (link !== undefined) updateData.link = link;
        if (time !== undefined) updateData.time = new Date(time); 
        if (imagePath !== null) updateData.image = imagePath; 

        
        if (Object.keys(updateData).length > 0) {
          await promotion.update(updateData); 
        }

        
        const updatedPromotion = await Promotion.findByPk(id);
        if(!updatedPromotion){
          return next(ApiError.notFound("Акция не найдена после обновления"))
        }
        const promotionData = updatedPromotion.get({ plain: true });
        const timeEnd = promotionData.time ? new Date(promotionData.time) : new Date();
        const now = new Date();
        const timeLeftSeconds = Math.max(0, Math.floor((timeEnd.getTime() - now.getTime()) / 1000));

        return res.json({
          ...promotionData,
          timeLeft: timeLeftSeconds
        });
    } catch (err:unknown) {
      if(err instanceof Error){
        next(ApiError.badRequest(err.message));
      }
      else{
        next(ApiError.badRequest('Неизвестная ошибка'));
      }
    }
  }
}

export default new PromotionController(); 