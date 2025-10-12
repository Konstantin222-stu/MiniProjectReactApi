class ApiError extends Error {
    
    constructor(status, message, errors = [], code = null) {
        super(message);
        this.status = status;
        this.errors = errors;
        this.code = code || `ERR_${status}`;
        this.timestamp = new Date().toISOString();
    }

    static unauthorized(message = 'Пользователь не авторизован') {
        return new ApiError(401, message, [], 'UNAUTHORIZED');
    }

    static badRequest(message = 'Некорректный запрос', errors = []) {
        return new ApiError(400, message, errors, 'BAD_REQUEST');
    }

    static validationFailed(errors = [], message = 'Ошибка валидации') {
        return new ApiError(422, message, errors, 'VALIDATION_FAILED');
    }

    static notFound(message = 'Ресурс не найден') {
        return new ApiError(404, message, [], 'NOT_FOUND');
    }

    static internal(message = 'Внутренняя ошибка сервера') {
        return new ApiError(500, message, [], 'INTERNAL_ERROR');
    }

    static forbidden(message = 'Доступ запрещен') {
        return new ApiError(403, message, [], 'FORBIDDEN');
    }

    static conflict(message = 'Конфликт данных') {
        return new ApiError(409, message, [], 'CONFLICT');
    }

    toJSON() {
        return {
            status: this.status,
            message: this.message,
            errors: this.errors,
            code: this.code,
            timestamp: this.timestamp
        };
    }
}

module.exports = ApiError;