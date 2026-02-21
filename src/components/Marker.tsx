import { AdvancedMarker, useAdvancedMarkerRef } from '@vis.gl/react-google-maps';
import { css } from '@emotion/react';
import { Link } from 'react-router';
import { ChannelThumbnail } from './ChannelThumbnail';
import type { Content } from '../utils/type';

interface MarkerProps {
  position: google.maps.LatLngLiteral;
  data: Content;
}

export const Marker = ({ position, data }: MarkerProps) => {
  const [markerRef] = useAdvancedMarkerRef();

  return (
    <AdvancedMarker
      position={position}
      ref={markerRef}
    >
      <Link
        to={`/content/${data.id}`}
        css={css`
          display: flex;
          flex-direction: column;
          align-items: center;
          cursor: pointer;
          color: black;
          font-size: 0.75rem;
          font-weight: 700;
          text-shadow: var(--gray-10) 0 0 0.5rem;
          text-decoration: none;

          &:hover {
            transform: scale(1.125);
            color: black;
          }
        `}
      >
        <ChannelThumbnail
          title=""
          thumbnailDefault={data.channel.thumbnailDefault}
          thumbnailMedium={data.channel.thumbnailMedium}
          thumbnailHigh={data.channel.thumbnailHigh}
        />
        <div>
          {data.channel.title}
        </div>
      </Link>
    </AdvancedMarker>
  );
};
