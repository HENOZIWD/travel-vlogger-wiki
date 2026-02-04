import { Badge, Flex, Heading, Text } from '@radix-ui/themes';
import { ChannelThumbnail } from './ChannelThumbnail';
import { Link } from 'react-router';
import type { Feature, Point } from 'geojson';
import { css } from '@emotion/react';
import type { Content } from '../utils/type';

interface ClusteredContentListProps { features: Feature<Point>[] }

export const ClusteredContentList = ({ features }: ClusteredContentListProps) => {
  if (features.length === 0) return;

  return (
    <Flex
      asChild
      gap="3"
      direction="column"
      maxHeight="18rem"
      maxWidth="24rem"
    >
      <ul>
        {features.map((feature) => {
          const content = feature.properties as Content;

          return (
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
          );
        })}
      </ul>
    </Flex>
  );
};
