import { Badge, Flex, Heading, Text } from '@radix-ui/themes';
import type { Content as ContentType } from '../utils/type';
import { Link } from 'react-router';
import { ChannelThumbnail } from './ChannelThumbnail';
import { css } from '@emotion/react';

interface ContentProps { data: ContentType }

export const Content = ({ data }: ContentProps) => {
  return (
    <Flex
      direction="column"
      gap="1"
    >
      <Link to={`/content/${data.id}`}>
        <Heading
          as="h3"
          size="3"
        >
          {data.title}
        </Heading>
      </Link>
      {data.tags.length > 0
        ? (
          <ul css={css`
              display: flex;
              gap: 0.25rem;
            `}
          >
            {data.tags.map(({ id, name }) => (
              <li key={id}>
                <Badge variant="surface">{name}</Badge>
              </li>
            ))}
          </ul>
        )
        : null}
      <Flex
        gap="2"
        align="center"
      >
        <ChannelThumbnail
          title={data.channel.title}
          size="1"
          thumbnailDefault={data.channel.thumbnailDefault}
          thumbnailMedium={data.channel.thumbnailMedium}
          thumbnailHigh={data.channel.thumbnailHigh}
        />
        <Text size="2">
          {data.channel.title}
        </Text>
      </Flex>
    </Flex>
  );
};
