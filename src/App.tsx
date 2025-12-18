import './App.css';
import { AdvancedMarker, APIProvider, Map } from '@vis.gl/react-google-maps';

function App() {
  const position = {
    lat: 52.54992,
    lng: 10.00678,
  };

  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <Map
        style={{
          width: '100vw',
          height: '100vh',
        }}
        defaultCenter={position}
        defaultZoom={10}
        streetViewControl={false}
        mapId="DEMO_MAP_ID"
        mapTypeControl={false}
      >
        <AdvancedMarker position={position} />
      </Map>
    </APIProvider>
  );
}

export default App;
