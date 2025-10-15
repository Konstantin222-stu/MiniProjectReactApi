import {Router} from 'express'
import userController from '../controllers/userController'
import authMiddleware from '../middleware/authMiddleware';

const userRouter = Router();

userRouter.get('/check', authMiddleware(), userController.checkUser)
userRouter.post('/login', userController.login)

export default userRouter