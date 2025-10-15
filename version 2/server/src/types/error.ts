export interface IValidationError{
    field:string,
    message:string,
    value?:string | number | boolean | null;
}

export interface IApiErrorResponse<T = IValidationError> {
    status: number,
    message: string,
    errors: T[],
    code: string,
    timestamp: string
}

export type HttpStatusCode = 400 | 401 | 403 | 404 | 409 | 422 | 500 
export type ErrorCode = 'UNAUTHORIZED' | 'BAD_REQUEST' | 'VALIDATION_FAILED' | 'NOT_FOUND' | 'INTERNAL_ERROR' | 'FORBIDDEN' | 'CONFLICT' 