import { css } from '@emotion/react';
import { APIProvider, Map, type MapMouseEvent } from '@vis.gl/react-google-maps';
import type { ReactNode } from 'react';
import { useContentRegisterFormState } from '../hooks/useContentRegisterFormState';
import { useSearchParams } from 'react-router';

const defaultPosition = {
  lat: 36,
  lng: 36,
};

interface WorldMapProps { children?: ReactNode }

export const WorldMap = ({ children }: WorldMapProps) => {
  const { setPosition } = useContentRegisterFormState();
  const [searchParams] = useSearchParams();

  const isRegistering = searchParams.get('register') === 'true';

  const handleClick = (event: MapMouseEvent) => {
    const position = event.detail.latLng;
    if (!position) return;

    setPosition(position);
  };

  return (
    <APIProvider
      apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
      region="KR"
    >
      <Map
        css={css`
            width: 100%;
            height: 100%;
            position: relative;
          `}
        defaultCenter={defaultPosition}
        defaultZoom={10}
        minZoom={3}
        streetViewControl={false}
        mapId="DEMO_MAP_ID"
        mapTypeControl={false}
        restriction={{
          latLngBounds: {
            west: -180,
            east: 180,
            south: -85,
            north: 85,
          },
          strictBounds: true,
        }}
        fullscreenControl={false}
        onClick={isRegistering ? handleClick : undefined}
      >
        {children}
      </Map>
    </APIProvider>
  );
};
