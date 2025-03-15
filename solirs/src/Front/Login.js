// Versão corrigida do Login.js - importe apenas este código
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Styles/Login.css";

function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setIsLoading(true);
      setError("");
      
      try {
        const response = await fetch('http://localhost:5000/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include', // importante para cookies de sessão
          body: JSON.stringify({ username, password }),
        });
        
        const data = await response.json();
        
        if (response.ok) {
          // Guardar dados do usuário no localStorage ou em um context
          localStorage.setItem('user', JSON.stringify(data.user));
          // Redirecionar para a página inicial
          navigate("/home");
        } else {
          setError(data.message || "Erro ao fazer login");
        }
      } catch (error) {
        setError("Erro de conexão com o servidor");
        console.error("Erro:", error);
      } finally {
        setIsLoading(false);
      }
    };
  
    return (
      <div className="login-container">
        <h1>SOLIDARIEDADE RS</h1>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            placeholder="Usuário" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
          />
          <input 
            type="password" 
            placeholder="Senha" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Entrando..." : "Entrar"}
          </button>
        </form>
        <div className="signup-option">
          <p>Ainda não tem uma conta?</p>
          <button onClick={() => navigate("/cadastro")} className="signup-button">Cadastre-se</button>
        </div>
      </div>
    );
}

export default Login;