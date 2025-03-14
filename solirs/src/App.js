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