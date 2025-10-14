import { Router } from 'express';
import productController from '../controllers/productsController';
import authMiddleware  from '../middleware/authMiddleware';

const productsRouter = Router();

productsRouter.get('/', productController.get);
productsRouter.get('/:id', productController.getID);
productsRouter.post('/', authMiddleware, productController.post);
productsRouter.put('/:id', authMiddleware, productController.put);
productsRouter.delete('/:id', authMiddleware, productController.delete);

export default productsRouter;