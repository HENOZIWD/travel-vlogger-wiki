import type { Marker as MarkerType } from '@googlemaps/markerclusterer';
import { AdvancedMarker } from '@vis.gl/react-google-maps';
import { useCallback } from 'react';
import type { Marker as MarkerData } from '../utils/marker';
import { css } from '@emotion/react';

interface MarkerProps {
  data: MarkerData;
  setMarkerRef: (marker: MarkerType | null, key: string) => void;
}

export const Marker = ({ data, setMarkerRef }: MarkerProps) => {
  const ref = useCallback((marker: google.maps.marker.AdvancedMarkerElement) =>
    setMarkerRef(marker, data.id),
  [setMarkerRef, data.id]);

  return (
    <AdvancedMarker
      position={data.positions[0]}
      ref={ref}
    >
      <img
        src={data.channel.thumbnailDefault}
        alt={data.channel.title}
        srcSet={`
          ${data.channel.thumbnailDefault} 88w,
          ${data.channel.thumbnailMedium} 240w,
          ${data.channel.thumbnailHigh} 800w
        `}
        sizes="2.5rem"
        css={css`
          width: 2.5rem;
          height: 2.5rem;
          border-radius: 9999px;
        `}
      />
    </AdvancedMarker>
  );
};
