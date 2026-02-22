import { css } from '@emotion/react';
import { Map, useMap, type MapMouseEvent } from '@vis.gl/react-google-maps';
import { useEffect, type ReactNode } from 'react';
import { useLocation, useSearchParams } from 'react-router';
import { usePosition } from '../hooks/usePosition';
import { useTheme } from '../hooks/useTheme';
import { useMapViewport } from '../hooks/useMapViewport';

const restriction = {
  latLngBounds: {
    west: -180,
    east: 180,
    south: -85,
    north: 85,
  },
  strictBounds: true,
};

interface WorldMapProps { children?: ReactNode }

export const WorldMap = ({ children }: WorldMapProps) => {
  const { setPosition } = usePosition();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const { theme } = useTheme();

  const map = useMap();
  const { mapViewport, setMapViewport } = useMapViewport();

  useEffect(() => {
    if (!map) return;

    const updateViewPort = () => {
      const bounds = map.getBounds()?.toJSON();
      const center = map.getCenter()?.toJSON();
      const zoom = map.getZoom();

      if (!bounds || !center || !zoom) return;

      setMapViewport({
        bounds,
        center,
        zoom,
      });
    };

    const listener = map.addListener('idle', updateViewPort);

    // updateViewPort();

    return () => listener.remove();
  }, [map, setMapViewport]);

  const isRegistering = location.pathname === '/register';
  const isEditing = searchParams.get('edit') === 'true';

  const handleClick = (event: MapMouseEvent) => {
    const position = event.detail.latLng;
    if (!position) return;

    setPosition(position);
  };

  return (
    <Map
      css={css`
        width: 100%;
        height: 100%;
        position: relative;
      `}
      defaultCenter={mapViewport.center}
      defaultZoom={mapViewport.zoom}
      minZoom={3}
      maxZoom={18}
      streetViewControl={false}
      mapId="DEMO_MAP_ID"
      mapTypeControl={false}
      restriction={restriction}
      fullscreenControl={false}
      onClick={isRegistering || isEditing ? handleClick : undefined}
      colorScheme={theme === 'dark' ? 'DARK' : 'LIGHT'}
    >
      {children}
    </Map>
  );
};
