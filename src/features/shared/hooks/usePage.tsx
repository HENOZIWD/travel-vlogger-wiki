import { useEffect, useMemo, useState, type RefObject } from 'react';
import { chunk } from '../utils/array';
import { css } from '@emotion/react';
import { Button } from '@radix-ui/themes';

const getVisiblePages = (curPage: number, maxPage: number, pageVisibleAmount: number) => {
  const visiblePages: number[] = [];

  for (let i = 0; i < maxPage; i += 1) {
    if (i === 0
      || i === maxPage - 1
      || (curPage - pageVisibleAmount <= i && i <= curPage + pageVisibleAmount)) {
      visiblePages.push(i);
    }
  }

  return visiblePages;
};

interface UsePageParams<T> {
  data: T[];
  dataAmountPerPage: number;
  pageVisibleAmount?: number;
  scrollRef?: RefObject<HTMLUListElement | null>;
}

export function usePage<T>({
  data,
  dataAmountPerPage,
  pageVisibleAmount = 2,
  scrollRef,
}: UsePageParams<T>) {
  const [page, setPage] = useState<number>(0);
  const chunkedData = useMemo(() => chunk(data, dataAmountPerPage), [data, dataAmountPerPage]);
  const visiblePages = getVisiblePages(page, chunkedData.length, pageVisibleAmount);

  useEffect(() => {
    if (!scrollRef?.current) return;

    scrollRef.current.scrollTop = 0;
  }, [page, scrollRef]);

  const paginationElement = (
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
  );

  return {
    currentPageData: chunkedData[page] ?? [],
    paginationElement,
  };
};
