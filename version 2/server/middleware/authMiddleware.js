import jwt from 'jsonwebtoken';
const { User } = require('../models/');

module.exports = function () {
    return async function (req, res, next) {
        if (req.method === "OPTIONS") {
            return next();
        }

        try {
            const token = req.headers.authorization?.split(' ')[1];
            if (!token) {
                return res.status(401).json({ message: 'Токен не предоставлен' });
            }
            
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            console.log('Decoded token:', decoded);
            

            if (!decoded.id) {
                return res.status(401).json({ message: 'Неверная структура токена' });
            }

            const user = await User.findOne({ where: { id_user: decoded.id } });
            
            if (!user) {
                return res.status(404).json({ message: 'Пользователь не найден' });
            }
 
            req.user = {
                id_user: decoded.id,
                ...user.get({ plain: true })
            };
            console.log('Authenticated user:', req.user);
            
            next();
        } catch (e) {
            console.error('Ошибка аутентификации:', e);
            
            if (e.name === 'TokenExpiredError') {
                return res.status(401).json({ message: 'Токен истёк' });
            }
            if (e.name === 'JsonWebTokenError') {
                return res.status(401).json({ message: 'Неверный токен' });
            }
            
            return res.status(500).json({ message: 'Ошибка аутентификации' });
        }
    };
};