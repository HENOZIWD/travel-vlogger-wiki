import { MarkerClusterer, type Marker as MarkerType } from '@googlemaps/markerclusterer';
import { useMap } from '@vis.gl/react-google-maps';
import { useCallback, useEffect, useMemo, useState } from 'react';
import type { Marker as MarkerData } from '../utils/marker';
import { Marker } from './Marker';

interface ClusteredMarkersProps { data: MarkerData[] }

export const ClusteredMarkers = ({ data }: ClusteredMarkersProps) => {
  const [markers, setMarkers] = useState<{ [key: string]: MarkerType }>({});

  const map = useMap();
  const clusterer = useMemo(() => {
    if (!map) return null;

    return new MarkerClusterer({ map });
  }, [map]);

  useEffect(() => {
    if (!clusterer) return;

    clusterer.clearMarkers();
    clusterer.addMarkers(Object.values(markers));
  }, [clusterer, markers]);

  const setMarkerRef = useCallback((marker: MarkerType | null, key: string) => {
    setMarkers((markers) => {
      if ((marker && markers[key]) || (!marker && !markers[key])) {
        return markers;
      }

      if (marker) {
        return {
          ...markers,
          [key]: marker,
        };
      }

      const { [key]: _, ...newMarkers } = markers;

      return newMarkers;
    });
  }, []);

  return (
    <>
      {data.map((marker) => (
        <Marker
          key={marker.id}
          data={marker}
          setMarkerRef={setMarkerRef}
        />
      ))}
    </>
  );
};
