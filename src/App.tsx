import Weather from "./components/Weather.tsx";
import React from "react";
import Mapa from "./components/Mapa";
import Google from "./components/Google";
import MyMapComponent from "./components/Mapa";

const App: React.FC = () => {
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>🚍 Simulador de Autocarros - Braga</h1>
     <Google />
     <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Weather />
    </div>
    <h1>Mapa com Paragens Fictícias</h1>
      <MyMapComponent />
    </div>
  );
};

export default App;
