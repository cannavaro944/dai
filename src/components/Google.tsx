import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import './Google.css';
const Google = () => {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: 'AIzaSyC25BF9tRi5zBubn6Uds0sHDjBMqkE1vHE',
      })

    return (

<div className='map'>
    {isLoaded ? (
        <GoogleMap
        mapContainerStyle={{width: '50%', height: '100%'}}
        center={{
            lat: 41.5454, 
            lng: -8.4265,
      }}
      zoom={14}
    ></GoogleMap>
  ) : (
    <></>
)}
</div>

    );
};

export default Google;