import { Flex } from '@radix-ui/themes';
import type { Content as ContentType } from '../utils/type';
import { Content } from './Content';

interface SearchContentResultProps {
  data: ContentType[] | undefined;
  isFetching: boolean;
  isError: boolean;
}

export const SearchContentResult = ({ data, isFetching, isError }: SearchContentResultProps) => {
  if (isFetching) return <div>검색 중...</div>;
  if (isError || data === undefined) return <div>검색 중 오류가 발생했습니다.</div>;

  if (data.length === 0) return <div>검색 결과가 없습니다.</div>;

  return (
    <Flex
      asChild
      gap="3"
      direction="column"
      maxHeight="18rem"
      maxWidth="24rem"
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
