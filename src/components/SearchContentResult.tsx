import { Flex, Heading } from '@radix-ui/themes';
import { Content } from './Content';
import { useSuspenseQuery } from '@tanstack/react-query';
import { searchContents } from '../apis/searchContents';
import { useSearchParams } from 'react-router';

export const SearchContentResult = () => {
  const [searchParams] = useSearchParams();
  const q = searchParams.get('q');
  const tags = searchParams.get('tags');

  const { data } = useSuspenseQuery({
    queryKey: ['searchContent', q, tags],
    queryFn: () => searchContents({
      q,
      tags,
    }),
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
        maxHeight="18rem"
        p="4"
      >
        {data.length === 0
          ? <div>검색 결과가 없습니다.</div>
          : (
            <ul>
              {data.map((content) => (
                <li key={content.id}>
                  <Content data={content} />
                </li>
              ))}
            </ul>
          )}
      </Flex>
    </>
  );
};
