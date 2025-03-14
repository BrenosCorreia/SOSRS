// No topo do seu arquivo App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Importando os componentes
import Login from './Front/Login';
import Cadastro from './Front/Cadastro';
import Home from './Front/Home';
import Mapa from './Front/Mapa';
import News from './Front/News';
import SolicitacaoAjuda from './Front/Ajuda';
import Forum from './Front/Forum';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/home" element={<Home />} />
        <Route path="/mapa" element={<Mapa />} />
        <Route path="/news" element={<News />} />
        <Route path="/solicitacao" element={<SolicitacaoAjuda />} />
        <Route path="/forum" element={<Forum />} />
      </Routes>
    </Router>
  );
}

export default App;