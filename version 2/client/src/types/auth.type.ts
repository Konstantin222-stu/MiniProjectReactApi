import type { ReactNode } from "react";

export interface User {
    role: 'admin'
}

export interface LoginCredentials{
    login: string;
    password: string
}

export interface LoginResponse{
    success: boolean; 
    error?: string;
}

export interface AuthContextType{
    admin: boolean;
    loading: boolean;
    login: (credentials: LoginCredentials) => Promise<LoginResponse>;
    logout: () => void;
    isAdmin: boolean
    user: User | null
}

export interface AuthProviderProps {
    children: ReactNode
}