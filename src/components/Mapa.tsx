import React, { useEffect, useRef, useState } from "react";
import { GoogleMap, Marker, InfoWindow, LoadScript } from "@react-google-maps/api"; 

// Defina as coordenadas das paragens fictícias
const fakeStops = [
  { lat: -23.550520, lng: -46.633308, name: "Paragem A" },
  { lat: -23.545520, lng: -46.623308, name: "Paragem B" },
  { lat: -23.540520, lng: -46.613308, name: "Paragem C" },
];

const containerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: -23.550520, 
  lng: -46.633308
};

const MyMapComponent: React.FC = () => {
  const [selectedStop, setSelectedStop] = useState<{ lat: number; lng: number; name: string } | null>(null);

  return (
    <LoadScript googleMapsApiKey="ff5b8a7c222968914ecb01d57ac093c9  ">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
      >
        {/* Adicionar marcadores para as paragens fictícias */}
        {fakeStops.map((stop, index) => (
          <Marker
            key={index}
            position={{ lat: stop.lat, lng: stop.lng }}
            onClick={() => setSelectedStop(stop)}
          />
        ))}

        {/* Exibir a janela de informações ao clicar no marcador */}
        {selectedStop && (
          <InfoWindow
            position={{ lat: selectedStop.lat, lng: selectedStop.lng }}
            onCloseClick={() => setSelectedStop(null)}
          >
            <div>
              <h3>{selectedStop.name}</h3>
              <p>Esta é uma paragem fictícia.</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default MyMapComponent;
