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
            text-shadow: -2px 0px black, 0px 2px black, 2px 0px black, 0px -2px black;
            color: white;
            font-size: 0.875rem;
            font-weight: 400;
          `}
        >
          {data.channel.title}
        </div>
      </Link>
    </AdvancedMarker>
  );
};
