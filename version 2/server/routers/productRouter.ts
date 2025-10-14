import { Router } from 'express';
import productController from '../controllers/productsController';
import authMiddleware  from '../middleware/authMiddleware';

const productsRouter = Router();

router.get('/', productController.get);
router.get('/:id', productController.getID);
router.post('/', authMiddleware, productController.post);
router.put('/:id', authMiddleware, productController.put);
router.delete('/:id', authMiddleware, productController.delete);

export default productsRouter;