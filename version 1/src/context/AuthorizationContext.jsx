import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { $host } from '../http/handlerApi';

export const AuthorizationContext = createContext();

export const AuthProvider = ({ children }) => {
    const [admin, setAdmin] = useState(null);
    const [loading, setLoading] = useState(true);

    const verifyToken = useCallback(async (token) => {
        try {
            const response = await $host.get('/api/user/', {
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
                if (!isValid) {
                    console.warn('User not authorized - invalid token');
                }
            } else {
                setAdmin(false);
                console.warn('User not authorized - no token');
            }
            setLoading(false);
        };
        
        checkAuth();
    }, [verifyToken]);

    const login = useCallback(async (token) => {
        localStorage.setItem('authToken', token);
        setAdmin(true);
    }, []);

    const logout = useCallback(() => {
        localStorage.removeItem('authToken');
        setAdmin(false);
    }, []);

    const value = {
        admin,
        loading,
        login,
        logout
    };

    return (
        <AuthorizationContext.Provider value={value}>
            {!loading && children}
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