import {Router} from 'express'
import userController from '../controllers/userController'
import checkRole from '../middleware/authMiddleware'

const userRouter = Router();

router.get('/check', checkRole(), userController.checkUser)
router.post('/login', userController.login)

module.exports = userRouter