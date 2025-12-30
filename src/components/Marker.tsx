import type { Marker as MarkerType } from '@googlemaps/markerclusterer';
import { AdvancedMarker } from '@vis.gl/react-google-maps';
import { useCallback } from 'react';
import type { Marker as MarkerData } from '../utils/marker';
import { css } from '@emotion/react';
import { useSearchParams } from 'react-router';
import { ChannelThumbnail } from './ChannelThumbnail';

interface MarkerProps {
  data: MarkerData;
  setMarkerRef: (marker: MarkerType | null, key: string) => void;
}

export const Marker = ({ data, setMarkerRef }: MarkerProps) => {
  const ref = useCallback((marker: google.maps.marker.AdvancedMarkerElement) =>
    setMarkerRef(marker, data.id),
  [setMarkerRef, data.id]);

  const [searchParams, setSearchParams] = useSearchParams();

  const handleMarkerClick = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete('register');
    newParams.set('content', data.id);
    setSearchParams(newParams);
  };

  return (
    <AdvancedMarker
      position={data.positions[0]}
      ref={ref}
    >
      <div
        css={css`
          display: flex;
          flex-direction: column;
          align-items: center;
          cursor: pointer;

          &:hover {
            transform: scale(1.125);
          }
        `}
        onClick={handleMarkerClick}
      >
        <ChannelThumbnail
          title={data.channel.title}
          thumbnailDefault={data.channel.thumbnailDefault}
          thumbnailMedium={data.channel.thumbnailMedium}
          thumbnailHigh={data.channel.thumbnailHigh}
        />
        <div css={css`
            font-size: 0.75rem;
            font-weight: 700;
            text-shadow: #000 0 0 0.5rem;
          `}
        >
          {data.channel.title}
        </div>
      </div>
    </AdvancedMarker>
  );
};
