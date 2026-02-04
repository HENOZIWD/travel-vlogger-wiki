import { useQuery } from '@tanstack/react-query';
import { getContents } from '../apis/getContents';
import { ClusteredMarkers } from './ClusteredMarkers';
import { useLocation, useSearchParams } from 'react-router';
import { useCallback, useMemo, useState } from 'react';
import type { Feature, FeatureCollection, Point } from 'geojson';
import { ClusteredContentList } from './ClusteredContentList';
import { InfoWindow } from '@vis.gl/react-google-maps';

const emptyGeojson: FeatureCollection<Point> = {
  type: 'FeatureCollection',
  features: [],
};

export const ContentList = () => {
  const { isPending, isError, data } = useQuery({
    queryKey: ['markerList'],
    queryFn: getContents,
  });

  const location = useLocation();
  const [searchParams] = useSearchParams();

  const [infoWindowData, setInfoWindowData] = useState<{
    anchor: google.maps.marker.AdvancedMarkerElement;
    features: Feature<Point>[];
  } | null>(null);

  const geojson = useMemo<FeatureCollection<Point>>(() => {
    if (!data) return emptyGeojson;

    return {
      type: 'FeatureCollection',
      features: data.map((marker) => ({
        type: 'Feature',
        id: marker.id,
        geometry: {
          type: 'Point',
          coordinates: [marker.position.lng, marker.position.lat],
        },
        properties: { ...marker },
      })),
    };
  }, [data]);

  const handleInfoWindowClose = useCallback(
    () => setInfoWindowData(null),
    [setInfoWindowData],
  );

  const isRegistering = location.pathname === '/register';
  const isEditing = searchParams.get('edit') === 'true';

  if (isPending || isError) return null;

  return (
    <>
      <ClusteredMarkers
        geojson={isRegistering || isEditing
          ? emptyGeojson
          : geojson}
        setInfoWindowData={setInfoWindowData}
      />
      {infoWindowData
        ? (
          <InfoWindow
            anchor={infoWindowData.anchor}
            onClose={handleInfoWindowClose}
          >
            <ClusteredContentList features={infoWindowData.features} />
          </InfoWindow>
        )
        : null}
    </>
  );
};
