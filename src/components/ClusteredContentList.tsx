import { Button } from '@radix-ui/themes';
import type { Feature, Point } from 'geojson';
import type { Content as ContentType } from '../utils/type';
import { Content } from './Content';
import { ErrorMessage } from './ErrorMessage';
import { chunk } from '../utils/array';
import { useEffect, useMemo, useRef, useState } from 'react';
import { css } from '@emotion/react';

interface ClusteredContentListProps { features: Feature<Point>[] }

const CONTENT_COUNT_PER_PAGE = 10;
const PAGE_VISIBLE_AMOUNT = 2;

export const ClusteredContentList = ({ features }: ClusteredContentListProps) => {
  const [page, setPage] = useState<number>(0);
  const chunkedFeatures = useMemo(() => chunk(features, CONTENT_COUNT_PER_PAGE), [features]);
  const scrollRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (!scrollRef.current) return;

    scrollRef.current.scrollTop = 0;
  }, [page]);

  if (features.length === 0) return (
    <ErrorMessage
      size="2"
      message="마커 처리 중 오류가 발생했습니다."
    />
  );

  const getVisiblePages = () => {
    const visiblePages: number[] = [];
    const totalPageCount = chunkedFeatures.length;

    for (let i = 0; i < totalPageCount; i += 1) {
      if (i === 0
        || i === totalPageCount - 1
        || (page - PAGE_VISIBLE_AMOUNT <= i && i <= page + PAGE_VISIBLE_AMOUNT)) {
        visiblePages.push(i);
      }
    }

    return visiblePages;
  };

  const visiblePages = getVisiblePages();

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
        {chunkedFeatures[page].map((feature) => {
          const content = feature.properties as ContentType;

          return (
            <li key={content.id}>
              <Content data={content} />
            </li>
          );
        })}
      </ul>
      <ul css={css`
          display: flex;
          gap: 0.25rem;
          padding: 0.5rem 0;
          padding-right: 0.75rem;
          justify-content: center;
        `}
      >
        {visiblePages.length > 1
          ? visiblePages.map((num, i) => {
            return (
              <li
                key={num}
                css={css`
                display: flex;
                flex-direction: row;
                align-items: center;
                gap: 0.25rem;
              `}
              >
                {i > 0 && num - visiblePages[i - 1] > 1 ? <div>...</div> : null}
                <Button
                  type="button"
                  variant={num === page ? 'soft' : 'outline'}
                  disabled={page === num}
                  onClick={() => setPage(num)}
                >
                  {num + 1}
                </Button>
              </li>
            );
          })
          : null}
      </ul>
    </>
  );
};
