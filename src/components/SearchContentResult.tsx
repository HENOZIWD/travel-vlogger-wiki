import { Badge, Flex, Heading, Text } from '@radix-ui/themes';
import { Link } from 'react-router';
import { ChannelThumbnail } from './ChannelThumbnail';
import { css } from '@emotion/react';
import type { Content } from '../utils/type';

interface SearchContentResultProps {
  data: Content[] | undefined;
  isFetching: boolean;
  isError: boolean;
}

export const SearchContentResult = ({ data, isFetching, isError }: SearchContentResultProps) => {
  if (isFetching) return <div>검색 중...</div>;
  if (isError || data === undefined) return <div>검색 중 오류가 발생했습니다.</div>;

  if (data.length === 0) return <div>검색 결과가 없습니다.</div>;

  return (
    <ul>
      {data.map((content) => (
        <li key={content.id}>
          <Flex
            direction="column"
            gap="1"
          >
            <Link to={`/content/${content.id}`}>
              <Heading
                as="h3"
                size="3"
              >
                {content.title}
              </Heading>
            </Link>
            {content.tags.length > 0
              ? (
                <ul css={css`
                    display: flex;
                    gap: 0.25rem;
                  `}
                >
                  {content.tags.map(({ id, name }) => (
                    <li key={id}>
                      <Badge variant="surface">{name}</Badge>
                    </li>
                  ))}
                </ul>
              )
              : null}
            <Flex gap="2">
              <ChannelThumbnail
                title={content.channel.title}
                size="1"
                thumbnailDefault={content.channel.thumbnailDefault}
                thumbnailMedium={content.channel.thumbnailMedium}
                thumbnailHigh={content.channel.thumbnailHigh}
              />
              <Text css={css`
                  line-height: 2;
                `}
              >
                {content.channel.title}
              </Text>
            </Flex>
          </Flex>
        </li>
      ))}
    </ul>
  );
};
