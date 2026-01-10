import { useQuery } from '@tanstack/react-query';
import { getContents } from '../apis/getContents';
import { ClusteredMarkers } from './ClusteredMarkers';
import { useLocation, useSearchParams } from 'react-router';
import { useMemo } from 'react';
import type { FeatureCollection, Point } from 'geojson';

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

  const geojson = useMemo<FeatureCollection<Point>>(() => {
    if (!data) return emptyGeojson;

    return {
      type: 'FeatureCollection',
      features: data.map((marker) => ({
        type: 'Feature',
        id: marker.id,
        geometry: {
          type: 'Point',
          coordinates: [marker.positions[0].lng, marker.positions[0].lat],
        },
        properties: { ...marker },
      })),
    };
  }, [data]);

  const isRegistering = location.pathname === '/register';
  const isEditing = searchParams.get('edit') === 'true';

  if (isPending || isError) return null;

  return (
    <ClusteredMarkers geojson={isRegistering || isEditing
      ? emptyGeojson
      : geojson}
    />
  );
};
