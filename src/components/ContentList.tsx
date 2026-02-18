import { useQuery } from '@tanstack/react-query';
import { getContents } from '../apis/getContents';
import { ClusteredMarkers } from './ClusteredMarkers';
import { useLocation, useSearchParams } from 'react-router';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
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
    });

    return () => {
      google.maps.event.removeListener(dragstartListener);
      google.maps.event.removeListener(idleListener);
    };
  }, [debouncedUpdateMapState, map]);

  const {
    isLoading,
    data,
    refetch,
    isFetched,
    isFetching,
  } = useQuery({
    queryKey: ['contentList', mapState],
    queryFn: () => getContents(mapState!.bound),
    enabled: false,
    placeholderData: (prev) => prev,
  });

  const firstFetchRef = useRef(true);

  useEffect(() => {
    if (!mapState || !firstFetchRef.current) return;

    refetch();
    firstFetchRef.current = false;
  }, [mapState, refetch]);

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

  const location = useLocation();
  const [searchParams] = useSearchParams();

  const isRegistering = location.pathname === '/register';
  const isEditing = searchParams.get('edit') === 'true';

  if (isLoading || !mapState) return null;

  const canRefetch = mapState.zoom >= 7;

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
            <ErrorBoundary>
              <ClusteredContentList features={infoWindowData.features} />
            </ErrorBoundary>
          </InfoWindow>
        )
        : null}
      {!isFetched && data && !isDragging
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
            onClick={() => refetch()}
            loading={isFetching}
            disabled={isFetching || !canRefetch}
          >
            {canRefetch ? '이 지역 검색' : '확대하여 검색'}
          </Button>
        )
        : null}
    </>
  );
};
