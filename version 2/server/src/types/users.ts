import type { NextFunction, Request, Response } from "express";
import type { AuthRequest } from "./middleware";

export interface LoginRequestBody{
    login: string;
    password: string
}

export interface CheckUserResponse {
    token: string;
    user: {
        id:number;
        login:string;
    }
}

export interface LoginResponse{
    token:string
}

export interface IUserController {
    checkUser(req: AuthRequest, res: Response, next: NextFunction): Promise<Response | void>;
    login(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
}