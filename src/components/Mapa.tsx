import React, { useState, useEffect } from "react"; 
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import busIconImg from "../assets/BUS.png";
import stopIconImg from "../assets/paragem.png"; // Ícone das paragens

// Definir ícone do autocarro
const busMarker = new L.Icon({
    iconUrl: busIconImg,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
});

// Definir ícone das paragens
const stopMarker = new L.Icon({
    iconUrl: stopIconImg,
    iconSize: [50, 50], // Aumentado o tamanho do ícone
    iconAnchor: [25, 50],
});

interface Stop {
    id: number;
    lat: number;
    lng: number;
    nome: string;
}

interface Bus {
    id: number;
    lat: number;
    lng: number;
    rota: string;
    targetStop: number;
}

const stops: Stop[] = [
    { id: 1, lat: 41.547, lng: -8.426, nome: "Paragem A" },
    { id: 2, lat: 41.550, lng: -8.423, nome: "Paragem B" },
    { id: 3, lat: 41.553, lng: -8.420, nome: "Paragem C" },
];
  
const initialBusLocations: Bus[] = [
    { id: 1, lat: 41.5454, lng: -8.4265, rota: "Linha 2", targetStop: 0 },
    { id: 2, lat: 41.555, lng: -8.42, rota: "Linha 7", targetStop: 1 },
    { id: 3, lat: 41.54, lng: -8.43, rota: "Linha 10", targetStop: 2 },
];  

const Mapa: React.FC = () => {
    const [busLocations, setBusLocations] = useState<Bus[]>(initialBusLocations);
    const [selectedStop, setSelectedStop] = useState<Stop | null>(null);
    const [selectedBus, setSelectedBus] = useState<Bus | null>(null);

    useEffect(() => {
        const interval = setInterval(() => {
            setBusLocations((prev) => prev.map((bus) => {
                const stop = stops[bus.targetStop];
                if (!stop) return bus;

                const latDiff = (stop.lat - bus.lat) * 0.1;
                const lngDiff = (stop.lng - bus.lng) * 0.1;

                const newLat = bus.lat + latDiff;
                const newLng = bus.lng + lngDiff;

                const distance = Math.sqrt(latDiff ** 2 + lngDiff ** 2);
                if (distance < 0.0005) {
                    bus.targetStop = (bus.targetStop + 1) % stops.length;
                }

                return { ...bus, lat: newLat, lng: newLng };
            }));
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div style={{ display: "flex" }}>
            <div style={{ width: "65%" }}>
                <MapContainer center={[41.5454, -8.4265]} zoom={14} style={{ height: "100vh", width: "100%" }}>
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    
                    {/* Marcadores das paragens */}
                    {stops.map((stop) => (
                        <Marker key={stop.id} position={[stop.lat, stop.lng]} icon={stopMarker} eventHandlers={{ click: () => setSelectedStop(stop) }}>
                            <Popup>🅿️ {stop.nome}</Popup>
                        </Marker>
                    ))}
                    
                    {/* Marcadores dos autocarros */}
                    {busLocations.map((bus) => (
                        <Marker key={bus.id} position={[bus.lat, bus.lng]} icon={busMarker} eventHandlers={{ click: () => setSelectedBus(bus) }}>
                            <Popup>🚍 {bus.rota}</Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </div>
            <div style={{ width: "35%", padding: "20px", backgroundColor: "#f4f4f4", marginLeft: "50px" }}>
                <h2>Informações</h2>
                {selectedStop && (
                    <div>
                        <h3>Paragem Selecionada</h3>
                        <p><strong>Nome:</strong> {selectedStop.nome}</p>
                        <p><strong>Localização:</strong> {selectedStop.lat}, {selectedStop.lng}</p>
                    </div>
                )}
                {selectedBus && (
                    <div>
                        <h3>Autocarro Selecionado</h3>
                        <p><strong>Rota:</strong> {selectedBus.rota}</p>
                        <p><strong>Localização:</strong> {selectedBus.lat.toFixed(5)}, {selectedBus.lng.toFixed(5)}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Mapa;
