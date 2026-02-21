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
      <div
        css={css`
          display: flex;
          align-items: center;
          justify-content: center;
          height: 3rem;
          width: 3rem;
          font-size: 1rem;
          background-color: var(--accent-9);
          box-shadow: 0 0 8px 4px var(--accent-6);
          border-radius: 9999px;
          text-decoration: none;
          color: #fff;

          &:hover {
            transform: scale(1.125);
          }
        `}
        aria-label={`${markerCount}개의 콘텐츠가 모여 있음`}
      >
        <span aria-hidden>{markerCount}</span>
      </div>
    </AdvancedMarker>
  );
};
