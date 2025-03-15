// Crie um novo arquivo AuthContext.js na sua estrutura de pastas
import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar se o usuário está autenticado quando o componente montar
    const checkAuthStatus = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/auth/check', {
          credentials: 'include', // importante para cookies de sessão
        });
        
        const data = await response.json();
        
        if (data.authenticated) {
          // Buscar dados completos do usuário
          const userResponse = await fetch('http://localhost:5000/api/usuario', {
            credentials: 'include',
          });
          
          if (userResponse.ok) {
            const userData = await userResponse.json();
            setCurrentUser(userData.user);
          }
        } else {
          setCurrentUser(null);
        }
      } catch (error) {
        console.error("Erro ao verificar autenticação:", error);
        setCurrentUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = (userData) => {
    setCurrentUser(userData);
  };

  const logout = async () => {
    try {
      await fetch('http://localhost:5000/api/logout', {
        method: 'POST',
        credentials: 'include',
      });
      
      setCurrentUser(null);
      localStorage.removeItem('user');
      navigate('/');
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar o contexto
export const useAuth = () => useContext(AuthContext);

export default AuthContext;