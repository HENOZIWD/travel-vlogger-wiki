import type { Feature, Point } from 'geojson';
import type { Content as ContentType } from '../../shared/utils/type';
import { Content } from '../../shared/components/Content';
import { ErrorMessage } from '../../shared/components/ErrorMessage';
import { useRef } from 'react';
import { css } from '@emotion/react';
import { usePage } from '../../shared/hooks/usePage';

interface ClusteredContentListProps { features: Feature<Point>[] }

const CONTENT_COUNT_PER_PAGE = 10;

export const ClusteredContentList = ({ features }: ClusteredContentListProps) => {
  const scrollRef = useRef<HTMLUListElement>(null);

  const { currentPageData, paginationElement } = usePage({
    data: features,
    dataAmountPerPage: CONTENT_COUNT_PER_PAGE,
    scrollRef,
  });

  if (features.length === 0) return (
    <ErrorMessage
      size="2"
      message="마커 처리 중 오류가 발생했습니다."
    />
  );

  return (
    <>
      <ul
        ref={scrollRef}
        css={css`
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          max-height: 24rem;
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
