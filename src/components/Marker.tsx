import type { Marker as MarkerType } from '@googlemaps/markerclusterer';
import { AdvancedMarker } from '@vis.gl/react-google-maps';
import { useCallback } from 'react';
import type { Marker as MarkerData } from '../utils/marker';
import { css } from '@emotion/react';
import { Link } from 'react-router';
import { ChannelThumbnail } from './ChannelThumbnail';

interface MarkerProps {
  data: MarkerData;
  setMarkerRef: (marker: MarkerType | null, key: string) => void;
}

export const Marker = ({ data, setMarkerRef }: MarkerProps) => {
  const ref = useCallback((marker: google.maps.marker.AdvancedMarkerElement) => {
    setMarkerRef(marker, data.id);
  }, [setMarkerRef, data.id]);

  return (
    <AdvancedMarker
      position={data.positions[0]}
      ref={ref}
    >
      <Link
        to={`/content/${data.id}`}
        css={css`
          display: flex;
          flex-direction: column;
          align-items: center;
          cursor: pointer;
          color: black;

          &:hover {
            transform: scale(1.125);
            color: black;
          }
        `}
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
      </Link>
    </AdvancedMarker>
  );
};
