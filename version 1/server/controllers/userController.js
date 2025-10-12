const { User } = require("../models/");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const ApiError = require("../error");

class UserController {

  async checkUser(req, res) {
    try {
      
      if (!req.user?.id_user) { 
        return res.status(401).json({ message: 'Токен не содержит ID пользователя' });
      }
  
      const user = await User.findByPk(req.user.id_user, {
        attributes: ['id_user', 'login']
      });
  
      if (!user) {
        return res.status(404).json({ message: 'Пользователь не найден в базе' });
      }

      const newToken = jwt.sign(
        { id: user.id_user}, 
        process.env.SECRET_KEY,
        { expiresIn: '24h' }
      );
  
      return res.json({ 
        token: newToken,
        user: {
          id: user.id_user, 
          login: user.login,
        }
      });
    } catch (err) {
      console.error('Ошибка в checkUser:', err);
      return res.status(500).json({ message: 'Внутренняя ошибка сервера' });
    }
}


  async login(req, res, next) {
    try {
      const { login, password } = req.body;

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
        process.env.SECRET_KEY,
        { expiresIn: '24h' }
      );

      return res.json({ token });
    } catch (err) {
      next(ApiError.badRequest(err.message));
    }
  }
}

module.exports = new UserController();