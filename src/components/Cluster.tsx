import { css } from '@emotion/react';
import { AdvancedMarker, useAdvancedMarkerRef } from '@vis.gl/react-google-maps';
import { useCallback } from 'react';

interface ClusterProps {
  clusterId: number;
  onClusterClick?: (
    marker: google.maps.marker.AdvancedMarkerElement,
    clusterId: number,
  ) => void;
  position: google.maps.LatLngLiteral;
  markerCount: number;
}

export const Cluster = ({
  clusterId,
  onClusterClick,
  position,
  markerCount,
}: ClusterProps) => {
  const [markerRef, marker] = useAdvancedMarkerRef();
  const handleClick = useCallback(
    () => marker && onClusterClick?.(marker, clusterId),
    [onClusterClick, marker, clusterId],
  );

  return (
    <AdvancedMarker
      ref={markerRef}
      position={position}
      onClick={handleClick}
    >
      <div css={css`
          display: flex;
          align-items: center;
          justify-content: center;
          height: 3rem;
          width: 3rem;
          font-size: 0.875rem;
          font-weight: 700;
          background-color: tomato;
          border-radius: 9999px;
        `}
      >
        {markerCount}
      </div>
    </AdvancedMarker>
  );
};
