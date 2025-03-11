import React from "react";
import Mapa from "./components/Mapa";

const App: React.FC = () => {
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>🚍 Simulador de Autocarros - Braga</h1>
      <Mapa />
    </div>
  );
};

export default App;
