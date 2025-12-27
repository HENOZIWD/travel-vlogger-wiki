import { css } from '@emotion/react';
import { APIProvider, Map } from '@vis.gl/react-google-maps';
import type { ReactNode } from 'react';

const position = {
  lat: 36,
  lng: 36,
};

interface WorldMapProps { children?: ReactNode }

export const WorldMap = ({ children }: WorldMapProps) => {
  return (
    <APIProvider
      apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
      region="KR"
    >
      <Map
        css={css`
            width: 100%;
            height: 100%;
          `}
        defaultCenter={position}
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
      >
        {children}
      </Map>
    </APIProvider>
  );
};
