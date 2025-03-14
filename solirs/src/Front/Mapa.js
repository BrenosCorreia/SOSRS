// Página Mapa
function Mapa() {
    const navigate = useNavigate();
    return (
      <div className="map-container">
        <button className="top-right-button" onClick={() => navigate("/home")}>
          Voltar
        </button>
        <h2>Mapa do Rio Grande do Sul</h2>
        <MapContainer center={[-30.0346, -51.2177]} zoom={7} style={{ height: "500px", width: "100%" }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        </MapContainer>
      </div>
    );
  }