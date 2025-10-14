import {Router} from 'express'
import promotionController from '../controllers/promotionController'
import authMiddleware from '../middleware/authMiddleware';

const promotionRouter = Router();

promotionRouter.get('/', promotionController.get)
promotionRouter.put('/:id',authMiddleware, promotionController.put)

export default promotionRouter