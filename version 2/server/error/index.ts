interface IValidationError{
    field:string,
    message:string,
    value?:string | number | boolean | null;
}

interface IApiErrorResponse<T = IValidationError> {
    status: number,
    message: string,
    errors: T[],
    code: string,
    timestamp: string
}

type HttpStatusCode = 400 | 401 | 403 | 404 | 409 | 422 | 500 
type ErrorCode = 'UNAUTHORIZED' | 'BAD_REQUEST' | 'VALIDATION_FAILED' | 'NOT_FOUND' | 'INTERNAL_ERROR' | 'FORBIDDEN' | 'CONFLICT' 

class ApiError<T = IValidationError> extends Error {
    public status:HttpStatusCode;
    public errors:T[];
    public code:ErrorCode;
    public timestamp:string;
    
    constructor(status:HttpStatusCode, message:string, errors:T[] = [], code:ErrorCode  | null = null) {
        super(message);
        this.status = status;
        this.errors = errors;
        this.code = code || this.getDefaultErrorCode(status);
        this.timestamp = new Date().toISOString();
    }

    private getDefaultErrorCode(status: HttpStatusCode): ErrorCode {
        const defaultCodes: Record<HttpStatusCode, ErrorCode> = {
            400: 'BAD_REQUEST',
            401: 'UNAUTHORIZED', 
            403: 'FORBIDDEN',
            404: 'NOT_FOUND',
            409: 'CONFLICT',
            422: 'VALIDATION_FAILED',
            500: 'INTERNAL_ERROR'
        };
        return defaultCodes[status];
    }

    static unauthorized(message:string = 'Пользователь не авторизован'):ApiError<IValidationError> {
        return new ApiError(401, message, [], 'UNAUTHORIZED');
    }

    static badRequest(message:string = 'Некорректный запрос', errors:IValidationError[] = []):ApiError<IValidationError>  {
        return new ApiError(400, message, errors, 'BAD_REQUEST');
    }

    static validationFailed(errors:IValidationError[] = [], message:string  = 'Ошибка валидации'):ApiError<IValidationError> {
        return new ApiError(422, message, errors, 'VALIDATION_FAILED');
    }

    static notFound(message:string = 'Ресурс не найден'):ApiError<IValidationError> {
        return new ApiError(404, message, [], 'NOT_FOUND');
    }

    static internal(message:string = 'Внутренняя ошибка сервера'):ApiError<IValidationError> {
        return new ApiError(500, message, [], 'INTERNAL_ERROR');
    }

    static forbidden(message:string = 'Доступ запрещен'):ApiError<IValidationError> {
        return new ApiError(403, message, [], 'FORBIDDEN');
    }

    static conflict(message:string = 'Конфликт данных'):ApiError<IValidationError> {
        return new ApiError(409, message, [], 'CONFLICT');
    }

    toJSON():IApiErrorResponse<T> {
        return {
            status: this.status,
            message: this.message,
            errors: this.errors,
            code: this.code,
            timestamp: this.timestamp
        };
    }
}

export default ApiError;