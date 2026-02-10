import { Flex } from '@radix-ui/themes';
import type { Feature, Point } from 'geojson';
import type { Content as ContentType } from '../utils/type';
import { Content } from './Content';
import { ErrorMessage } from './ErrorMessage';

interface ClusteredContentListProps { features: Feature<Point>[] }

export const ClusteredContentList = ({ features }: ClusteredContentListProps) => {
  if (features.length === 0) return (
    <ErrorMessage
      size="2"
      message="마커 처리 중 오류가 발생했습니다."
    />
  );

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
          const content = feature.properties as ContentType;

          return (
            <li key={content.id}>
              <Content data={content} />
            </li>
          );
        })}
      </ul>
    </Flex>
  );
};
