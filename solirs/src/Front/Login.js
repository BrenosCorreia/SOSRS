// Componente de Login
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Styles/Login.css";



function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // Aqui você poderia adicionar a lógica de autenticação
      navigate("/home");
    };
  
    return (
      <div className="login-container">
        <h1>SOLIDARIEDADE RS</h1>
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
          <button type="submit">Entrar</button>
        </form>
        <div className="signup-option">
          <p>Ainda não tem uma conta?</p>
          <button onClick={() => navigate("/cadastro")} className="signup-button">Cadastre-se</button>
        </div>
      </div>
    );
  }

  export default Login;