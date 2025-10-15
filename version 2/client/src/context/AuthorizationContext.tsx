import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { $host } from '../http/handlerApi';
import type {
    AuthContextType, 
    AuthProviderProps, 
    LoginCredentials, 
    LoginResponse,
} from '../types/auth.type';

export const AuthorizationContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [admin, setAdmin] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    const verifyToken = useCallback(async (token:string):Promise<boolean> => {
        try {
            const response = await $host.get<{ token: string }>('user/check', {
                headers: { Authorization: `Bearer ${token}` }
            });
            
            if (response.data.token) {
                localStorage.setItem('authToken', response.data.token);
                return true;
            }
            return false;
        } catch (error) {
            console.error('Token verification error:', error);
            localStorage.removeItem('authToken');
            return false;
        }
    }, []);

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('authToken');
            if (token) {
                const isValid = await verifyToken(token);
                setAdmin(isValid);
            } else {
                setAdmin(false);
            }
            setLoading(false);
        };
        
        checkAuth();
    }, [verifyToken]);
    
    const login = async (credentials : LoginCredentials) : Promise<LoginResponse> => {
        try {
            setLoading(true);
            const response = await $host.post<{ token: string }>('/user/login', credentials);  
            const { token } = response.data;
            localStorage.setItem('authToken', token);
            setAdmin(true);
            return { success: true };
        } catch (error : any) {
            const errorMessage = error.response?.data?.message || error.message || 'Ошибка авторизации';
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    };

    const logout = useCallback(():void => {
        localStorage.removeItem('authToken');
        setAdmin(false);
    }, []);

    const value: AuthContextType = {
        admin,
        loading,
        login,
        logout,
        isAdmin: admin,
        user: admin ? { role: 'admin' as const } : null
    };

    return (
        <AuthorizationContext.Provider value={value}>
            {children}
        </AuthorizationContext.Provider>
    );
};

export const useAuth = ():AuthContextType => {
    const context = useContext(AuthorizationContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};