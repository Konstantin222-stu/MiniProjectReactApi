import type { AxiosRequestConfig } from "axios"

export interface CreateAxiosInstanceConfig extends AxiosRequestConfig{ 
    baseURL?: string;
    withAuth?: boolean;
}

export interface AuthAxiosRequestConfig extends AxiosRequestConfig { 
    headers?: { 
        Authorization?: string; 
    } & AxiosRequestConfig['headers'];
}