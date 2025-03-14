// Página Solicitação de Ajuda
function SolicitacaoAjuda() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [message, setMessage] = useState("");
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log("Solicitação enviada!", { name, location, message });
    };
  
    return (
      <div className="solicitacao-container">
        <button className="top-right-button" onClick={() => navigate("/home")}>
          Voltar
        </button>
        <h2>Solicitação de Ajuda</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Nome" value={name} onChange={(e) => setName(e.target.value)} required />
          <input type="text" placeholder="Localização" value={location} onChange={(e) => setLocation(e.target.value)} required />
          <textarea placeholder="Descreva a necessidade de ajuda" value={message} onChange={(e) => setMessage(e.target.value)} required />
          <button type="submit">Enviar</button>
        </form>
      </div>
    );
  }