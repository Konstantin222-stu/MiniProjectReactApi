import { Request } from 'express';

export interface IJwtPayload {
    id: number;
}
export interface IUser {
    id_user: number;
    login: string;
    password: string;
}

export interface AuthRequest extends Request {
    user?: IUser;
}