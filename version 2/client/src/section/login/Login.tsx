import React, { useState, type ChangeEvent, type FormEvent } from 'react'
import { useAuth } from '../../context/AuthorizationContext'; 
import { useNavigate } from 'react-router-dom';
import type { LoginCredentials, LoginProps } from '../../types/auth.type';

const Login: React.FC<LoginProps>  = ({close}) => {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const { login, admin, loading } = useAuth();
    
    const [formData, setFormData] = useState<LoginCredentials>({
        login: '',
        password: ''
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e:FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setError(null);
        setIsSubmitting(true);
        
        try {
            const result = await login(formData);
            if (result?.success) {
                navigate('/admin'); 
                
            } else {
                setError(result?.error || 'Ошибка авторизации');
            }
        } catch (error: any) {
            setError(error.message || 'Произошла ошибка при авторизации');
            console.error('Login error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!loading && admin) {
        navigate('/admin');
        close();
        return null;
    }
    
    return (
        <div className="login-container">
            {error && <div className="error-message">{error}</div>}
            <h1 className="title title_lg">Вход в админ панель</h1>
            <form onSubmit={handleSubmit} className="login-form">
                <div className="form-group">
                    <input
                        type="text"
                        name="login"
                        value={formData.login}
                        placeholder="Логин"
                        onChange={handleChange}
                        required
                        disabled={isSubmitting}
                        className="form-input"
                    />
                </div>
                
                <div className="form-group">
                    <input
                        type="password"
                        name="password"
                        placeholder="Пароль"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        disabled={isSubmitting}
                        className="form-input"
                    />
                </div>
                
                <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="button"
                >
                    {isSubmitting ? 'Вход...' : 'Авторизоваться'}
                </button>
            </form>
        </div>
    )
}

export default Login