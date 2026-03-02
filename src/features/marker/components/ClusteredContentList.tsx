import type { Feature, Point } from 'geojson';
import type { Content as ContentType } from '../../shared/utils/type';
import { Content } from '../../shared/components/Content';
import { ErrorMessage } from '../../shared/components/ErrorMessage';
import { useEffect, useRef, type Dispatch, type SetStateAction } from 'react';
import { css } from '@emotion/react';
import { usePage } from '../../shared/hooks/usePage';

interface ClusteredContentListProps {
  features: Feature<Point>[];
  setInfoWindowData: Dispatch<SetStateAction<{
    anchor: google.maps.marker.AdvancedMarkerElement;
    features: Feature<Point>[];
    offset: [number, number];
  } | null>>;
}

const CONTENT_COUNT_PER_PAGE = 5;

export const ClusteredContentList = ({ features, setInfoWindowData }: ClusteredContentListProps) => {
  const containerRef = useRef<HTMLUListElement>(null);

  const { currentPageData, paginationElement } = usePage({
    data: features,
    dataAmountPerPage: CONTENT_COUNT_PER_PAGE,
    scrollRef: containerRef,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const margin = 64;
      const overflowedAmount = -(rect.y - margin);

      if (overflowedAmount > 0) {
        setInfoWindowData((prev) => prev
          ? {
            ...prev,
            offset: [0, overflowedAmount],
          }
          : null);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  if (features.length === 0) return (
    <ErrorMessage
      size="2"
      message="마커 처리 중 오류가 발생했습니다."
    />
  );

  return (
    <>
      <ul
        ref={containerRef}
        css={css`
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          max-height: 26.5rem;
          overflow-y: auto;
          padding-right: 0.75rem;
        `}
      >
        {currentPageData.map((feature) => {
          const content = feature.properties as ContentType;

          return (
            <li key={content.id}>
              <Content data={content} />
            </li>
          );
        })}
      </ul>
      {paginationElement}
    </>
  );
};
