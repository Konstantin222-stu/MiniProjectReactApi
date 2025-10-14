import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { $host } from '../http/handlerApi';

export const AuthorizationContext = createContext();

export const AuthProvider = ({ children }) => {
    const [admin, setAdmin] = useState(false);
    const [loading, setLoading] = useState(true);

    const verifyToken = useCallback(async (token) => {
        try {
            const response = await $host.get('user/check', {
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
    
    const login = async (credentials) => {
        try {
            setLoading(true);
            const response = await $host.post('/user/login', credentials); 
            const { token } = response.data;
            localStorage.setItem('authToken', token);
            setAdmin(true);
            return { success: true };
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message || 'Ошибка авторизации';
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    };

    const logout = useCallback(() => {
        localStorage.removeItem('authToken');
        setAdmin(false);
    }, []);

    const value = {
        admin,
        loading,
        login,
        logout,
        isAdmin: admin,
        user: admin ? { role: 'admin' } : null
    };

    return (
        <AuthorizationContext.Provider value={value}>
            {children}
        </AuthorizationContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthorizationContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};