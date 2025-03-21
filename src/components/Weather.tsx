import { useState } from "react";

const API_KEY = "ff5b8a7c222968914ecb01d57ac093c9";  

interface ClimaDados {
  name: string;
  main: { temp: number };
  weather: { description: string }[];
}

const Weather = () => {
  const [cidade, setCidade] = useState<string>("");
  const [dadosClima, setDadosClima] = useState<ClimaDados | null>(null);
  const [erro, setErro] = useState<string | null>(null);


  const buscarClima = async () => {
    console.log("Valor de cidade antes da busca:", cidade); // <-- Verifica se a cidade foi atualizada corretamente
    if (!cidade.trim()) {
      setErro("Digite uma cidade válida!");
      return;
    }
  
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${API_KEY}&units=metric&lang=pt`;
      console.log("URL da API:", url); // <-- Verifica se a URL contém a cidade certa
  
      const resposta = await fetch(url);
  
      if (!resposta.ok) {
        throw new Error("Cidade não encontrada!");
      }
  
      const dados: ClimaDados = await resposta.json();
      setDadosClima(dados);
      setErro(null);
    } catch (error) {
      setErro(error instanceof Error ? error.message : "Erro ao buscar dados!");
      setDadosClima(null);
    }
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCidade(e.target.value);
    console.log("Nova cidade digitada:", e.target.value); // <-- Verificar no console
  };
  
  return (
    <div className="absolute top-135 ml-0 p-6 max-w-md mx-auto bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold mb-4 text-center">Consulta de Clima</h2>

      <input
      type="text"
      placeholder="Digite a cidade..."
      value={cidade}
      onChange={handleInputChange} // <- Agora está usando a função correta
      className="p-2 border rounded w-full"
    />
    
      <button
        onClick={buscarClima} // <- Chamamos a função ao clicar
        className="mt-2 p-2 bg-blue-500 text-white rounded w-full hover:bg-blue-600 transition"
      >
        Buscar
      </button>

      {erro && <p className="text-red-500 mt-2 text-center">{erro}</p>}

      {dadosClima && (
        <div className="mt-4 p-4 border rounded text-center">
          <h3 className="text-lg font-semibold">{dadosClima.name}</h3>
          <p className="text-xl">🌡 {dadosClima.main.temp}°C</p>
          <p>🌤 {dadosClima.weather[0].description}</p>
        </div>
      )}
    </div>
  
  );
};

export default Weather;
