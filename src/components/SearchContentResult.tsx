import { Button, Flex, Heading } from '@radix-ui/themes';
import { Content } from './Content';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { searchContents } from '../apis/searchContents';
import { useSearchParams } from 'react-router';
import { css } from '@emotion/react';
import { useScrollRestoration } from '../hooks/useScrollRestoration';

export const SearchContentResult = () => {
  const [searchParams] = useSearchParams();
  const q = searchParams.get('q');
  const tags = searchParams.get('tags');

  const { data, isFetchingNextPage, hasNextPage, fetchNextPage } = useSuspenseInfiniteQuery({
    queryKey: ['searchContent', q, tags],
    queryFn: ({ pageParam }: { pageParam: string | null }) => searchContents({
      q,
      tags,
      cursor: pageParam,
    }),
    initialPageParam: null,
    getNextPageParam: (lastpage) => lastpage.nextCursor,
  });

  const scrollRef = useScrollRestoration<HTMLUListElement>();

  const flattedData = data.pages.flatMap((page) => page.data);

  return (
    <>
      <Heading
        as="h1"
        size="4"
        align="center"
        mb="4"
      >
        {q ? `"${q}" ` : ' '}
        검색 결과
      </Heading>
      <Flex
        asChild
        gap="3"
        direction="column"
        p="4"
        css={css`
          overflow-y: auto;
          height: calc(100% - 5rem);
        `}
      >
        {flattedData.length === 0
          ? <div>검색 결과가 없습니다.</div>
          : (
            <ul ref={scrollRef}>
              {flattedData.map((content) => (
                <li key={content.id}>
                  <Content data={content} />
                </li>
              ))}
              {hasNextPage
                ? (
                  <Flex
                    asChild
                    justify="center"
                  >
                    <li>
                      <Button
                        type="button"
                        loading={isFetchingNextPage}
                        onClick={() => fetchNextPage()}
                      >
                        더 불러오기
                      </Button>
                    </li>
                  </Flex>
                )
                : null}
            </ul>
          )}
      </Flex>
    </>
  );
};
