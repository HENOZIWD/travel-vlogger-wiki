import { Flex, Heading, Text } from '@radix-ui/themes';
import { ChannelThumbnail } from './ChannelThumbnail';
import { Link } from 'react-router';
import type { Marker } from '../utils/marker';
import type { Feature, Point } from 'geojson';
import { css } from '@emotion/react';

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
          const content = feature.properties as Marker;

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
