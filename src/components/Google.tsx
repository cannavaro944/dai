import { GoogleMap, useJsApiLoader } from '@react-google-maps/api'; 
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
/*
import { cn } from "@/lib/utils";
import Image from "../assets/x.png";
import Image1 from "../assets/locationarrow.png";
*/
import './Google.css';

const Google = () => {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: 'AIzaSyBiTWTQg2hgb56o8b2e69yVOFm7Rbx5Ymg',
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



      {/*route*/}
      <div className="absolute left-0 top-130 -full flex items-start p-4">
      <Card className="p-4 rounded-lg mt-4 bg-white shadow-md w-full max-w-md">
        <div className="space-y-4">
          <div className="flex gap-4">
            <Input type="text" placeholder="Origin" />
            <Input type="text" placeholder="Destination" />
          </div>
          <div className="flex gap-4">
            <Button className="bg-blue-500 hover:bg-blue-600 text-white">
              Calculate Route
            </Button>
            <button
              onClick={() => GoogleMap}
              className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
            >
              
            </button>
          </div>
          <div className="flex justify-between items-center">
            <span>Distance:</span>
            <span>Duration:</span>
            <button
              onClick={() => alert(123)}
              className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
            >
            </button>
          </div>
        </div>
      </Card>
    </div>
    </div>
  );
};

export default Google;