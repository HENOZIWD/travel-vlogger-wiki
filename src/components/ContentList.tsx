import { useQuery } from '@tanstack/react-query';
import { getContents } from '../apis/getContents';
import { ClusteredMarkers } from './ClusteredMarkers';
import { useLocation, useSearchParams } from 'react-router';
import { useEffect, useMemo, useState } from 'react';
import type { Feature, FeatureCollection, Point } from 'geojson';
import { ClusteredContentList } from './ClusteredContentList';
import { InfoWindow, useMap } from '@vis.gl/react-google-maps';
import { ErrorBoundary } from './ErrorBoundary';
import { debounce } from '../utils/debounce';
import { Button } from '@radix-ui/themes';
import { css } from '@emotion/react';

const emptyGeojson: FeatureCollection<Point> = {
  type: 'FeatureCollection',
  features: [],
};

interface MapState {
  bound: google.maps.LatLngBoundsLiteral;
  zoom: number;
}

export const ContentList = () => {
  const map = useMap();
  const [mapState, setMapState] = useState<MapState | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isLastFetched, setIsLastFetched] = useState(true);
  const [isZoomEnough, setIsZoomEnough] = useState(false);

  const {
    isLoading,
    data,
    refetch,
    isFetched: isFirstFetched,
    isFetching,
  } = useQuery({
    queryKey: ['contentList'],
    queryFn: () => getContents(mapState!.bound),
    enabled: !!mapState,
    placeholderData: (prev) => prev,
  });

  const debouncedUpdateMapState = useMemo(
    () => debounce(({ bound, zoom }: MapState) => setMapState({
      bound,
      zoom,
    }), 250),
    [],
  );

  useEffect(() => {
    if (!map) return;

    const dragstartListener = map.addListener('dragstart', () => {
      setIsDragging(true);
    });

    const idleListener = map.addListener('idle', () => {
      const bound = map.getBounds()?.toJSON();
      const zoom = map.getZoom();

      if (!bound || !zoom) return;

      debouncedUpdateMapState({
        bound,
        zoom,
      });
      setIsDragging(false);
      setIsZoomEnough(zoom >= 7);
      if (isFirstFetched) {
        setIsLastFetched(false);
      }
    });

    return () => {
      google.maps.event.removeListener(dragstartListener);
      google.maps.event.removeListener(idleListener);
    };
  }, [debouncedUpdateMapState, map, isFirstFetched]);

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

  const location = useLocation();
  const [searchParams] = useSearchParams();

  const isRegistering = location.pathname === '/register';
  const isEditing = searchParams.get('edit') === 'true';

  const handleRefetch = async () => {
    await refetch();
    setIsLastFetched(true);
  };

  if (isLoading || !mapState) return null;

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
          >
            <ErrorBoundary>
              <ClusteredContentList features={infoWindowData.features} />
            </ErrorBoundary>
          </InfoWindow>
        )
        : null}
      {!isLastFetched && !isDragging
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
            disabled={isFetching || !isZoomEnough}
          >
            {isZoomEnough ? '이 지역 검색' : '확대하여 검색'}
          </Button>
        )
        : null}
    </>
  );
};
