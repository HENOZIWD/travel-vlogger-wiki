import { css } from '@emotion/react';
import { Map, type MapMouseEvent } from '@vis.gl/react-google-maps';
import { type ReactNode } from 'react';
import { useLocation, useSearchParams } from 'react-router';
import { usePosition } from '../hooks/usePosition';

const defaultPosition = {
  lat: 37.5664056,
  lng: 126.9778222,
};
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
      defaultCenter={defaultPosition}
      defaultZoom={5}
      minZoom={3}
      maxZoom={18}
      streetViewControl={false}
      mapId="DEMO_MAP_ID"
      mapTypeControl={false}
      restriction={restriction}
      fullscreenControl={false}
      onClick={isRegistering || isEditing ? handleClick : undefined}
    >
      {children}
    </Map>
  );
};
