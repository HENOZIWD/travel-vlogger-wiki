import { useNavigate, useParams } from 'react-router';
import { Drawer } from './Drawer';
import { useQuery } from '@tanstack/react-query';
import { getContentHistory } from '../apis/getContentHistory';
import { useState } from 'react';
import type { ContentHistory as ContentHistoryType } from '../utils/type';
import { Badge, Button, DataList, Flex, Heading } from '@radix-ui/themes';
import { css } from '@emotion/react';
import { ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';
import { Report } from './Report';

interface HistoryProps { data: ContentHistoryType }

const History = ({ data }: HistoryProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Button
        variant="soft"
        css={css`
        display: flex;
        gap: 0.5rem;
        width: 100%;
      `}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <Flex
          flexGrow="1"
          justify="between"
        >
          <div>
            편집자:
            {' '}
            {data.editor.maskedAddress}
          </div>
          <div>{new Date(data.createdAt).toLocaleString()}</div>
        </Flex>
        {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
      </Button>
      {isOpen
        ? (
          <>
            <DataList.Root
              size="2"
              my="2"
              css={css`
              padding: 0 0.75rem;
            `}
            >
              <DataList.Item align="center">
                <DataList.Label minWidth="5rem">위도</DataList.Label>
                <DataList.Value>{data.snapshot.position.lat}</DataList.Value>
                <DataList.Label minWidth="5rem">경도</DataList.Label>
                <DataList.Value>{data.snapshot.position.lng}</DataList.Value>
                <DataList.Label minWidth="5rem">태그</DataList.Label>
                <DataList.Value>
                  <Flex
                    wrap="wrap"
                    gap="2"
                    py="1"
                  >
                    {data.snapshot.tags.map((tag) => (
                      <Badge
                        key={tag.id}
                        variant="surface"
                        size="2"
                      >
                        {tag.name}
                      </Badge>
                    ))}
                  </Flex>
                </DataList.Value>
              </DataList.Item>
            </DataList.Root>
            <Flex
              mt="2"
              px="3"
              justify="end"
            >
              <Report
                historyId={data.id}
                editorId={data.editor.id}
              />
            </Flex>
          </>
        )
        : null}
    </div>
  );
};

export const ContentHistory = () => {
  const { contentId } = useParams();
  const navigate = useNavigate();

  const { data, isPending, isError } = useQuery({
    queryKey: ['contentHistory', contentId],
    queryFn: () => getContentHistory({ id: contentId! }),
    enabled: !!contentId,
  });

  if (!contentId || isPending || isError) return null;

  return (
    <Drawer
      key={contentId}
      onClose={() => navigate(-1)}
    >
      <Heading
        as="h1"
        my="2"
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
    </Drawer>
  );
};
