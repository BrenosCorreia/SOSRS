// Página Home
function Home() {
    const navigate = useNavigate();
  
    return (
      <div className="container">
        <h1 className="title">OPÇÕES</h1>
        <div className="button-grid">
          <button className="square-button" onClick={() => navigate("/mapa")}>
            ABRIGOS
          </button>
          <button className="square-button" onClick={() => navigate("/solicitacao")}>
            AJUDA
          </button>
          <button className="square-button" onClick={() => navigate("/forum")}>
            FÓRUM
          </button>
          <button className="square-button" onClick={() => navigate("/news")}>
            NOTÍCIAS
          </button>
        </div>
        <button className="logout-button" onClick={() => navigate("/")}>Sair</button>
      </div>
    );
  }