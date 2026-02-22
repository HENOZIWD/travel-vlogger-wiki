import { atomWithStorage } from 'jotai/utils';
import { useAtom } from 'jotai';

interface MapViewport {
  bounds: google.maps.LatLngBoundsLiteral;
  center: google.maps.LatLngLiteral;
  zoom: number;
}

const defaultMapViewport: MapViewport = {
  bounds: {
    west: -180,
    south: -90,
    east: 180,
    north: 90,
  },
  center: {
    lat: 37.5664056,
    lng: 126.9778222,
  },
  zoom: 7,
};

const mapViewportAtom = atomWithStorage<MapViewport>('mapViewport', defaultMapViewport);

export const useMapViewport = () => {
  const [mapViewport, setMapViewport] = useAtom(mapViewportAtom);

  return {
    mapViewport,
    setMapViewport,
  };
};
