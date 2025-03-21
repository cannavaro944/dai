import Weather from "./components/Weather.tsx";
import React from "react";
import Google from "./components/Google";

const App: React.FC = () => {
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>🚍 Simulador de Autocarros - Braga</h1>
     <Google />
     <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Weather />
      </div>
  </div>
  );
};

export default App;
