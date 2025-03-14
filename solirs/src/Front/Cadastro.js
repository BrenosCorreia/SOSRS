// Componente de Cadastro
function Cadastro() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
      nome: "",
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
      telefone: "",
      cidade: ""
    });
    const [error, setError] = useState("");
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      
      // Validações básicas
      if (formData.password !== formData.confirmPassword) {
        setError("As senhas não conferem!");
        return;
      }
      
      // Aqui você adicionaria a lógica para salvar o usuário
      console.log("Usuário cadastrado:", formData);
      
      // Mensagem de sucesso
      alert("Cadastro realizado com sucesso!");
      
      // Redirecionar para a página de login
      navigate("/");
    };
  
    return (
      <div className="cadastro-container">
        <h1>Cadastre-se</h1>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nome">Nome completo</label>
            <input 
              type="text" 
              id="nome"
              name="nome" 
              value={formData.nome} 
              onChange={handleChange} 
              required 
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">E-mail</label>
            <input 
              type="email" 
              id="email"
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              required 
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="username">Nome de usuário</label>
            <input 
              type="text" 
              id="username"
              name="username" 
              value={formData.username} 
              onChange={handleChange} 
              required 
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="telefone">Telefone</label>
            <input 
              type="tel" 
              id="telefone"
              name="telefone" 
              value={formData.telefone} 
              onChange={handleChange} 
              required 
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="cidade">Cidade</label>
            <input 
              type="text" 
              id="cidade"
              name="cidade" 
              value={formData.cidade} 
              onChange={handleChange} 
              required 
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <input 
              type="password" 
              id="password"
              name="password" 
              value={formData.password} 
              onChange={handleChange} 
              required 
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirmar senha</label>
            <input 
              type="password" 
              id="confirmPassword"
              name="confirmPassword" 
              value={formData.confirmPassword} 
              onChange={handleChange} 
              required 
            />
          </div>
          
          <div className="form-buttons">
            <button type="submit">Cadastrar</button>
            <button type="button" onClick={() => navigate("/")} className="back-button">Voltar para Login</button>
          </div>
        </form>
      </div>
    );
  }