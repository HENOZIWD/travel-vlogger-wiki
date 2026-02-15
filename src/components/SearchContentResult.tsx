import { Button, Flex, Heading } from '@radix-ui/themes';
import { Content } from './Content';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { searchContents } from '../apis/searchContents';
import { useSearchParams } from 'react-router';

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

  return (
    <>
      <Heading
        as="h1"
        size="5"
        align="center"
      >
        {q ? `"${q}" ` : ' '}
        검색 결과
      </Heading>
      <Flex
        asChild
        gap="3"
        direction="column"
        p="4"
      >
        {data.pages.length === 0
          ? <div>검색 결과가 없습니다.</div>
          : (
            <ul>
              {data.pages.flatMap((page) => page.data).map((content) => (
                <li key={content.id}>
                  <Content data={content} />
                </li>
              ))}
            </ul>
          )}
      </Flex>
      {hasNextPage
        ? (
          <Flex
            justify="center"
            mb="4"
          >
            <Button
              type="button"
              loading={isFetchingNextPage}
              onClick={() => fetchNextPage()}
            >
              더 불러오기
            </Button>
          </Flex>
        )
        : null}
    </>
  );
};
