const { Products } = require("../models/");
const uuid = require("uuid")
const path = require("path");
const fs = require("fs");
const ApiError = require("../error");

class ProductsController {
  async get(req, res, next) {
    try {
      const products = await Products.findAll();
      return res.json(products);
    } catch (err) {
      next(ApiError.internal(err.message));
    }
  }

  async getID(req, res, next) { 
    try {
      const { id } = req.params;
      const product = await Products.findByPk(id);

      if (!product) {
        return next(ApiError.notFound('Товар не найден'));
      }

      return res.json(product);
    } catch (err) {
      next(ApiError.internal(err.message));
    }
  }

  async post(req, res, next) {
    try {
      const { title, price, size, reviews, desc, stars, tags, category } = req.body;
      let imagePath = null;

      if (req.files?.image) {
        const { image } = req.files;
        const fileName = uuid.v4() + path.extname(image.name);
        imagePath = path.join('uploads', 'products', fileName);
        await image.mv(path.resolve(__dirname, '..', imagePath));
        imagePath = fileName;
      }

      const parsedSize = typeof size === 'string' ? JSON.parse(size) : size;
      const parsedTags = typeof tags === 'string' ? JSON.parse(tags) : tags;

      const product = await Products.create({
        title: title || null,
        price: price ? parseInt(price) : null,
        size: parsedSize || [],
        reviews: reviews ? parseInt(reviews) : 0,
        desc: desc || null,
        stars: stars ? parseInt(stars) : 0,
        tags: parsedTags || [],
        category: category || null,
        image: imagePath 
      });

      return res.status(201).json(product);
    } catch (err) {
      next(ApiError.badRequest(err.message));
    }
  }

  async put(req, res, next) {
    try {
      const { id } = req.params;
      const product = await Products.findByPk(id);
      
      if (!product) {
        return next(ApiError.notFound('Товар не найден'));
      }

      const { title, price, size, reviews, desc, stars, tags, category } = req.body || {};
      let imagePath = null;

      
      if (req.files?.image) {
        if (product.image) {
          const oldImagePath = path.resolve(__dirname, '..', 'uploads', 'products', product.image);
          if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath);
          }
        }

        const { image } = req.files;
        const fileName = uuid.v4() + path.extname(image.name);
        imagePath = path.join('uploads', 'products', fileName);
        
        await image.mv(path.resolve(__dirname, '..', imagePath));
        imagePath = fileName;
      }

      const updateData = {};
      
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
    } catch (err) {
      next(ApiError.badRequest(err.message));
    }
  }

  async delete(req, res, next) {
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
    } catch (err) {
      next(ApiError.internal(err.message));
    }
  }
}

module.exports = new ProductsController();