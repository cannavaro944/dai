import React from "react";
import Mapa from "./components/Mapa";
import Google from "./components/Google";
import Weather from "./components/Weather";

const App: React.FC = () => {
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>🚍 Simulador de Autocarros - Braga</h1>
     <Google />
      <Weather/>
   
    </div>
  );
};

export default App;
