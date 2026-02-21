import { useParams } from 'react-router';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getContentHistory } from '../apis/getContentHistory';
import { Flex, Heading } from '@radix-ui/themes';
import { css } from '@emotion/react';
import { History } from './History';
import { usePosition } from '../hooks/usePosition';
import { useEffect } from 'react';

export const ContentHistory = () => {
  const { contentId } = useParams();
  const { resetPosition } = usePosition();

  useEffect(() => {
    resetPosition();
    return () => resetPosition();
  }, [resetPosition]);

  const { data } = useSuspenseQuery({
    queryKey: ['contentHistory', contentId],
    queryFn: () => getContentHistory({ id: contentId }),
  });

  if (!contentId) return null;

  return (
    <div key={contentId}>
      <Heading
        as="h1"
        my="4"
        mb="2"
        css={css`
          padding: 0 1rem;
        `}
      >
        편집 기록
      </Heading>
      <Flex
        asChild
        direction="column"
        gap="2"
        p="2"
      >
        <ul>
          {data.map((history) => (
            <li key={history.id}>
              <History data={history} />
            </li>
          ))}
        </ul>
      </Flex>
    </div>
  );
};
