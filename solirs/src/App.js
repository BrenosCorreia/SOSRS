// App.js com integração de autenticação
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './AuthContext';

// Importando os componentes
import Login from './Front/Login';
import Cadastro from './Front/Cadastro';
import Home from './Front/Home';
import Mapa from './Front/Mapa';
import News from './Front/News';
import SolicitacaoAjuda from './Front/Ajuda';
import Forum from './Front/Forum';

// Componente para rotas protegidas
const PrivateRoute = ({ children }) => {
  const user = localStorage.getItem('user');
  return user ? children : <Navigate to="/" />;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          {/* Rotas protegidas que requerem autenticação */}
          <Route 
            path="/home" 
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/mapa" 
            element={
              <PrivateRoute>
                <Mapa />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/news" 
            element={
              <PrivateRoute>
                <News />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/solicitacao" 
            element={
              <PrivateRoute>
                <SolicitacaoAjuda />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/forum" 
            element={
              <PrivateRoute>
                <Forum />
              </PrivateRoute>
            } 
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;