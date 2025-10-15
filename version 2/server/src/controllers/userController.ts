import { User } from "../models"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import ApiError from "../error"
import type {Request, Response, NextFunction} from 'express'
import type {AuthRequest} from '../types/middleware'
import type { LoginRequestBody,IUserController, CheckUserResponse, LoginResponse } from "../types/users"

class UserController implements IUserController {

  async checkUser(req: AuthRequest, res: Response, next: NextFunction): Promise<Response| void> {
    console.log('sssss');
    
    try {
      
      if (!req.user?.id_user) { 
        return next(ApiError.unauthorized('Токен не содержит ID пользователя'));
      }
  
      const user = await User.findByPk(req.user.id_user, {
        attributes: ['id_user', 'login']
      });
  
      if (!user) {
        return next(ApiError.notFound('Пользователь не найден в базе'));
      }

      const newToken = jwt.sign(
        { id: user.id_user}, 
        process.env.SECRET_KEY!,
        { expiresIn: '24h' }
      );
  
      return res.json({ 
        token: newToken,
        user: {
          id: user.id_user, 
          login: user.login,
        }
      } as CheckUserResponse);
    } catch (err: unknown) {
        if(err instanceof Error){
          next(ApiError.badRequest(err.message))
        }
        else{
          next(ApiError.internal('Неизвестная ошибка'))
        }
    }
}


  async login(req: Request, res:Response, next: NextFunction): Promise<Response | void> {
    try {
      const { login, password }:LoginRequestBody = req.body;

      if (!login || !password) {
        return next(ApiError.badRequest('Логин и пароль обязательны'));
      }

      const user = await User.findOne({ where: { login } });
      if (!user) {
        return next(ApiError.badRequest('Пользователь не найден'));
      }

      const comparePassword = await bcrypt.compare(password, user.password);
      if (!comparePassword) {
        return next(ApiError.badRequest('Неверный пароль'));
      }

      const token = jwt.sign(
        { id: user.id_user },
        process.env.SECRET_KEY!,
        { expiresIn: '24h' }
      );

      return res.json({ token } as LoginResponse);
    } catch (err: unknown) {
      if(err instanceof Error){
        next(ApiError.badRequest(err.message))
      }
      else{
        next(ApiError.internal('Неизвестная ошибка'));
      }
    }
  }
}

export default new UserController();