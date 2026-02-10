import { Flex } from '@radix-ui/themes';
import type { Tag } from '../utils/type';
import { Content } from './Content';
import { useSuspenseQuery } from '@tanstack/react-query';
import { searchContents } from '../apis/searchContents';

interface SearchContentResultProps {
  query: string;
  tags: Tag[];
}

export const SearchContentResult = ({ query, tags }: SearchContentResultProps) => {
  const { data } = useSuspenseQuery({
    queryKey: ['searchContent', query, tags],
    queryFn: () => searchContents({
      query,
      tags,
    }),
  });

  if (data.length === 0) return <div>검색 결과가 없습니다.</div>;

  return (
    <Flex
      asChild
      gap="3"
      direction="column"
      maxHeight="18rem"
    >
      <ul>
        {data.map((content) => (
          <li key={content.id}>
            <Content data={content} />
          </li>
        ))}
      </ul>
    </Flex>
  );
};
