import Router from 'express'
import promotionController from '../controllers/promotionController'
import checkRole from '../middleware/authMiddleware'

const promotionRouter = Router();

router.get('/', promotionController.get)
router.put('/:id',checkRole(), promotionController.put)

module.exports = promotionRouter