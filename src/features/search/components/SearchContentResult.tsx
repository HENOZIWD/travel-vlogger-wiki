import { Button, Flex, Heading, Select, Text } from '@radix-ui/themes';
import { Content } from '../../shared/components/Content';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { searchContents } from '../apis/searchContents';
import { useSearchParams } from 'react-router';
import { useScrollRestoration } from '../hook/useScrollRestoration';
import { css } from '@emotion/react';

export const SearchContentResult = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get('q');
  const tags = searchParams.get('tags');
  const sort = searchParams.get('sort');

  const { data, isFetchingNextPage, hasNextPage, fetchNextPage } = useSuspenseInfiniteQuery({
    queryKey: ['searchContent', q, tags, sort],
    queryFn: ({ pageParam }: { pageParam: string | null }) => searchContents({
      q,
      tags,
      sort,
      cursor: pageParam,
    }),
    initialPageParam: null,
    getNextPageParam: (lastpage) => lastpage.nextCursor,
  });

  const scrollRef = useScrollRestoration<HTMLUListElement>(`searchContent-${q}-${tags}-${sort}`);

  const flattedData = data.pages.flatMap((page) => page.data);

  return (
    <>
      <Heading
        as="h1"
        size="4"
        align="center"
        my="4"
      >
        {q ? `"${q}" ` : ' '}
        검색 결과
      </Heading>
      <div css={css`
          display: flex;
          gap: 0.5rem;
          align-items: center;
          justify-content: flex-end;
          padding-right: 0.5rem;
        `}
      >
        <Text
          as="div"
          size="2"
        >
          정렬
        </Text>
        <Select.Root
          key={sort}
          defaultValue={sort ?? 'latest'}
          onValueChange={(value) => setSearchParams((prev) => {
            prev.set('sort', value);
            return prev;
          })}
        >
          <Select.Trigger aria-label="정렬 방식 선택" />
          <Select.Content
            css={css`
              width: fit-content;
              height: fit-content;
            `}
            position="popper"
          >
            <Select.Item value="latest">최신순</Select.Item>
            <Select.Item value="oldest">오래된 순</Select.Item>
            <Select.Item value="mostViewed">조회수 높은 순</Select.Item>
            <Select.Item value="leastViewed">조회수 낮은 순</Select.Item>
            <Select.Item value="mostLiked">좋아요 높은 순</Select.Item>
            <Select.Item value="leastLiked">좋아요 낮은 순</Select.Item>
          </Select.Content>
        </Select.Root>
      </div>
      <Flex
        asChild
        gap="3"
        direction="column"
        p="4"
      >
        {flattedData.length === 0
          ? <div>검색 결과가 없습니다.</div>
          : (
            <ul
              ref={scrollRef}
              css={css`
                height: calc(100% - 96px);
                overflow-y: auto;
              `}
            >
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
