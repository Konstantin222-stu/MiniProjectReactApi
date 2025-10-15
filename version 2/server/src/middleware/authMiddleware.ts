import jwt from 'jsonwebtoken';
import type { Response, NextFunction } from 'express';
import { User } from '../models';
import type { AuthRequest, IJwtPayload } from '../types/middleware'
import ApiError from '../error';

export default function () {
    return async function (req: AuthRequest , res: Response, next: NextFunction) {
        if (req.method === "OPTIONS") {
            return next();
        }

        try {
            const token = req.headers.authorization?.split(' ')[1];
            if (!token) {
                return next(ApiError.unauthorized('Токен не предоставлен' ));
            }
            
            const decoded = jwt.verify(token, process.env.SECRET_KEY!) as IJwtPayload;
            console.log('Decoded token:', decoded);
            

            if (!decoded.id) {
                return next(ApiError.unauthorized('Неверная структура токена'));
            }

            const user = await User.findOne({ where: { id_user: decoded.id } });
            
            if (!user) {
                return next(ApiError.notFound('Пользователь не найден'));
            }
 
            req.user = {
                ...user.get({ plain: true })
            };
            console.log('Authenticated user:', req.user);
            
            next();
        } catch (e:unknown) {
            console.error('Ошибка аутентификации:', e);
            
            if (e instanceof jwt.TokenExpiredError) {
                return next(ApiError.unauthorized('Токен истёк'));
            }
            if (e instanceof jwt.JsonWebTokenError) {
                return next(ApiError.unauthorized('Неверный токен'));
            }
            
            return next(ApiError.internal('Ошибка аутентификации'));
        }
    };
};