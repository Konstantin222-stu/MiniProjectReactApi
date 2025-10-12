const { Type, Exercise } = require("../models/");
const ApiError = require("../error");

class TypeController {
  async get(req, res, next) {
    try {
      const { includeExercises } = req.query;
      
      const includeOptions = includeExercises === 'true' ? [{
        model: Exercise,
        as: 'Exercises',
        attributes: ['id_exercise', 'name_exercise'],
        required: false
      }] : [];

      const types = await Type.findAll({
        order: [['id_type', 'ASC']],
        include: includeOptions
      });

      return res.json(types);
    } catch (err) {
      next(ApiError.internal(err.message));
    }
  }

  async getID(req, res, next) {
    try {
      const { id } = req.params;
      const type = await Type.findByPk(id, {
        include: [{
          model: Exercise,
          as: 'Exercises',
          attributes: ['id_exercise', 'name_exercise'],
          required: false
        }]
      });

      if (!type) {
        return next(ApiError.notFound('Тип упражнения не найден'));
      }

      return res.json(type);
    } catch (err) {
      next(ApiError.internal(err.message));
    }
  }

  async post(req, res, next) {
    try {
      const { name_type } = req.body;

      if (!name_type || name_type.trim().length === 0) {
        return next(ApiError.badRequest('Название типа обязательно'));
      }

      if (name_type.length > 50) {
        return next(ApiError.badRequest('Название типа не должно превышать 50 символов'));
      }

      const type = await Type.create({ name_type });
      return res.status(201).json(type);
    } catch (err) {
      next(ApiError.badRequest(err.message));
    }
  }

  async put(req, res, next) {
    try {
      const { id } = req.params;
      const { name_type } = req.body;

      if (!name_type || name_type.trim().length === 0) {
        return next(ApiError.badRequest('Название типа обязательно'));
      }

      if (name_type.length > 50) {
        return next(ApiError.badRequest('Название типа не должно превышать 50 символов'));
      }

      const type = await Type.findByPk(id);
      if (!type) {
        return next(ApiError.notFound('Тип упражнения не найден'));
      }

      await type.update({ name_type });
      return res.json(type);
    } catch (err) {
      next(ApiError.badRequest(err.message));
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const type = await Type.findByPk(id);

      if (!type) {
        return next(ApiError.notFound('Тип упражнения не найден'));
      }

      const exercisesCount = await Exercise.count({
        where: { id_type: id }
      });

      if (exercisesCount > 0) {
        return next(ApiError.badRequest('Нельзя удалить тип, так как есть связанные упражнения'));
      }

      await type.destroy();
      return res.json({ message: 'Тип упражнения успешно удален' });
    } catch (err) {
      next(ApiError.internal(err.message));
    }
  }
}

module.exports = new TypeController();