import { Badge, Flex, Heading, Text } from '@radix-ui/themes';
import type { Content as ContentType } from '../utils/type';
import { Link } from 'react-router';
import { ChannelThumbnail } from './ChannelThumbnail';
import { css } from '@emotion/react';
import { EyeOpenIcon, HeartIcon } from '@radix-ui/react-icons';
import { formatNumber } from '../utils/format';

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
      {data.viewCount !== undefined && data.likeCount !== undefined
        ? (
          <div css={css`
          display: flex;
          gap: 0.125rem;
          font-size: 0.75rem;
          align-items: center;
        `}
          >
            <EyeOpenIcon
              width="0.75rem"
              height="0.75rem"
            />
            <div css={css`
                margin-right: 0.25rem;
              `}
            >
              {formatNumber(Number(data.viewCount))}
            </div>
            <HeartIcon
              width="0.75rem"
              height="0.75rem"
            />
            <div>
              {formatNumber(Number(data.likeCount))}
            </div>
          </div>
        )
        : null}
      <Flex
        justify="between"
        gap="4"
        align="center"
      >
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
        <Text size="2">{new Date(data.publishedAt).toLocaleDateString()}</Text>
      </Flex>
    </Flex>
  );
};
