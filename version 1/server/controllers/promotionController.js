const { Promotion } = require("../models/");
const uuid = require("uuid");
const path = require("path");
const fs = require("fs");
const ApiError = require("../error");

class PromotionController {
  async get(req, res, next) {
    try {
      const promotions = await Promotion.findAll();
      
      const promotionsWithTimeLeft = promotions.map(promotion => {
        const promotionData = promotion.get({ plain: true });
        
        const timeEnd = new Date(promotionData.time);
        const now = new Date();
        const timeLeftSeconds = Math.max(0, Math.floor((timeEnd - now) / 1000));
        
        return {
          ...promotionData,
          timeLeft: timeLeftSeconds  
        };
      });

      return res.json(promotionsWithTimeLeft);
    } catch (err) {
      next(ApiError.internal(err.message));
    }
  }

  async post(req, res, next) {
    try {
      const { subdesc, title, desc, price, sale, link, time } = req.body;
      let imagePath = null;

      if (req.files?.image) {
        const { image } = req.files;
        const fileName = uuid.v4() + path.extname(image.name);
        imagePath = path.join('uploads', 'promotion', fileName);
        await image.mv(path.resolve(__dirname, '..', imagePath));
        imagePath = fileName;
      }

      const promotion = await Promotion.create({
        subdesc: subdesc || null,
        title: title || null,
        desc: desc || null,
        price: price ? parseInt(price) : null,
        sale: sale ? parseInt(sale) : null,
        link: link || null,
        time: time ? new Date(time) : null, 
        image: imagePath  
      });


      const promotionData = promotion.get({ plain: true });
      const timeEnd = new Date(promotionData.time);
      const now = new Date();
      const timeLeftSeconds = Math.max(0, Math.floor((timeEnd - now) / 1000));

      return res.status(201).json({
        ...promotionData,
        timeLeft: timeLeftSeconds
      });
    } catch (err) {
      next(ApiError.badRequest(err.message));
    }
  }

  async put(req, res, next) {
    try {
      const { id } = req.params;
      const promotion = await Promotion.findByPk(id);
      
      if (!promotion) {
        return next(ApiError.notFound('Акция не найдена'));
      }

      const { subdesc, title, desc, price, sale, link, time } = req.body || {};
      let imagePath = null;

    
      if (req.files?.image) {    
        if (promotion.image) {
          const oldImagePath = path.resolve(__dirname, '..', 'uploads', 'promotion', promotion.image);
          if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath);
          }
        }

        const { image } = req.files;
        const fileName = uuid.v4() + path.extname(image.name);
        imagePath = path.join('uploads', 'promotion', fileName);
        
        await image.mv(path.resolve(__dirname, '..', imagePath));
        imagePath = fileName;
      }

      
      const updateData = {};
      
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
      const promotionData = updatedPromotion.get({ plain: true });
      const timeEnd = new Date(promotionData.time);
      const now = new Date();
      const timeLeftSeconds = Math.max(0, Math.floor((timeEnd - now) / 1000));

      return res.json({
        ...promotionData,
        timeLeft: timeLeftSeconds
      });
    } catch (err) {
      next(ApiError.badRequest(err.message));
    }
  }

}

module.exports = new PromotionController(); 