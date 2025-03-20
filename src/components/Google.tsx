import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import './Google.css';
const Google = () => {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: 'AIzaSyC25BF9tRi5zBubn6Uds0sHDjBMqkE1vHE',
      })

    return (

      <div className="map-container">
      {/* Container do Mapa */}
      <div className="map">
        {isLoaded ? (
          <GoogleMap
            mapContainerStyle={{ width: "100%", height: "100%" }}
            center={{
              lat: 41.5454,
              lng: -8.4265,
            }}
            zoom={14}
          />
        ) : (
          <p>Carregando mapa...</p>
        )}
      </div>

      {/* Painel de Informações ao lado */}
      <div className="info-panel">
        <h2>Informações do Local</h2>
        <p>Detalhes sobre a localização mostrada no mapa:</p>
        <ul>
          <li><strong>Latitude:</strong> 41.5454</li>
          <li><strong>Longitude:</strong> -8.4265</li>
          <li><strong>Zoom:</strong> 14</li>
        </ul>
      </div>
    </div>
  );
};

export default Google;