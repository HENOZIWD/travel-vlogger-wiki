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
          text-decoration: none;

          &:hover {
            transform: scale(1.125);
          }
        `}
      >
        <ChannelThumbnail
          title=""
          thumbnailDefault={data.channel.thumbnailDefault}
          thumbnailMedium={data.channel.thumbnailMedium}
          thumbnailHigh={data.channel.thumbnailHigh}
        />
        <div css={css`
            text-shadow: 0px -2px var(--gray-1), -2px 0px var(--gray-1), 2px 0px var(--gray-1), 0px 2px var(--gray-1);
            color: var(--gray-12);
            font-size: 0.875rem;
            font-weight: var(--marker-font-weight);
          `}
        >
          {data.channel.title}
        </div>
      </Link>
    </AdvancedMarker>
  );
};
