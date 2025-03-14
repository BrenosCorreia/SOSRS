// Página Notícias
function News() {
    const navigate = useNavigate();
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchNews = async () => {
        try {
          const response = await axios.get("https://api.rss2json.com/v1/api.json", {
            params: {
              rss_url: "https://g1.globo.com/rss/g1/rs/",
            },
          });
          setNews(response.data.items);
        } catch (err) {
          setError("Erro ao carregar notícias.");
        } finally {
          setLoading(false);
        }
      };
  
      fetchNews();
    }, []);
  
    if (loading) {
      return <div>Carregando...</div>;
    }
  
    if (error) {
      return <div>{error}</div>;
    }
  
    return (
      <div className="news-container">
        <button className="top-right-button" onClick={() => navigate("/home")}>
          Voltar
        </button>
        <h2>Notícias do Rio Grande do Sul</h2>
        <ul>
          {news.map((article, index) => (
            <li key={index} className="news-item">
              <a href={article.link} target="_blank" rel="noopener noreferrer">
                <h3>{article.title}</h3>
                <p>{article.description}</p>
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  }