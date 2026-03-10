import { useQuery } from '@tanstack/react-query';
import { getContents } from '../apis/getContents';
import { ClusteredMarkers } from './ClusteredMarkers';
import { useLocation, useSearchParams } from 'react-router';
import { useEffect, useMemo, useState } from 'react';
import type { Feature, FeatureCollection, Point } from 'geojson';
import { ClusteredContentList } from './ClusteredContentList';
import { InfoWindow, useMap } from '@vis.gl/react-google-maps';
import { ErrorBoundary } from '../../shared/components/ErrorBoundary';
import { Button } from '@radix-ui/themes';
import { css } from '@emotion/react';
import { useMapViewport } from '../../shared/hooks/useMapViewport';

const emptyGeojson: FeatureCollection<Point> = {
  type: 'FeatureCollection',
  features: [],
};

export const ContentList = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [isLastFetched, setIsLastFetched] = useState(true);

  const { mapViewport } = useMapViewport();

  const {
    isLoading,
    data,
    refetch,
    isFetched: isFirstFetched,
    isFetching,
  } = useQuery({
    queryKey: ['contentList'],
    queryFn: () => getContents(mapViewport!.bounds),
    enabled: !!mapViewport,
    placeholderData: (prev) => prev,
  });

  const map = useMap();

  useEffect(() => {
    if (!map) return;

    const dragstartListener = map.addListener('dragstart', () => {
      setIsDragging(true);
    });

    const idleListener = map.addListener('idle', () => {
      setIsDragging(false);
      if (isFirstFetched) {
        setIsLastFetched(false);
      }
    });

    return () => {
      google.maps.event.removeListener(dragstartListener);
      google.maps.event.removeListener(idleListener);
    };
  }, [map, isFirstFetched]);

  const [infoWindowData, setInfoWindowData] = useState<{
    anchor: google.maps.marker.AdvancedMarkerElement;
    features: Feature<Point>[];
    offset: [number, number];
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

  const location = useLocation();
  const [searchParams] = useSearchParams();

  const isRegistering = location.pathname === '/register';
  const isEditing = searchParams.get('edit') === 'true';

  const handleRefetch = async () => {
    await refetch();
    setIsLastFetched(true);
  };

  if (isLoading) return null;

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
            onClose={() => setInfoWindowData(null)}
            ariaLabel="콘텐츠 목록"
            pixelOffset={infoWindowData.offset}
            disableAutoPan
          >
            <ErrorBoundary>
              <ClusteredContentList
                features={infoWindowData.features}
                setInfoWindowData={setInfoWindowData}
              />
            </ErrorBoundary>
          </InfoWindow>
        )
        : null}
      {!isLastFetched && !isDragging && !(isRegistering || isEditing)
        ? (
          <Button
            type="button"
            size="3"
            css={css`
              position: absolute;
              z-index: 9999;
              bottom: 1rem;
              left: 50%;
              transform: translateX(-50%);
              white-space: nowrap;

              :disabled {
                background-color: var(--gray-12);
                color: var(--accent-1);
                opacity: 0.75;
              }
            `}
            onClick={handleRefetch}
            loading={isFetching}
          >
            이 지역 검색
          </Button>
        )
        : null}
    </>
  );
};
