import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';
import './Styles/Mapa.css';

function Mapa() {
  const navigate = useNavigate();

  // Função para voltar à página Home
  const voltarParaHome = () => {
    navigate('/home'); // Modifique esse caminho de acordo com sua configuração de rotas
  };

  return (
    <div className="page-container">
      <h1>Mapa do Rio Grande do Sul</h1>
      <div className="map-container">
        <MapContainer
          center={[-30.0346, -51.2177]}
          zoom={7}
          style={{ height: '100%', width: '100%' }} // Garante que o mapa ocupe todo o espaço
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </MapContainer>
        <button className="voltar-button" onClick={voltarParaHome}>Voltar</button>
      </div>
    </div>
  );
}

export default Mapa;