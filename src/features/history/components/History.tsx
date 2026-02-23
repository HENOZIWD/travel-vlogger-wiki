import { useState } from 'react';
import { css } from '@emotion/react';
import { Badge, Button, DataList, Flex } from '@radix-ui/themes';
import { ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';
import { Report } from './Report';
import { usePosition } from '../../shared/hooks/usePosition';
import { useMap } from '@vis.gl/react-google-maps';
import type { ContentHistory } from '../utils/type';

interface HistoryProps { data: ContentHistory }

export const History = ({ data }: HistoryProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { setPosition } = usePosition();
  const map = useMap();

  const handleFocusPosition = () => {
    if (!map) return;

    map.panTo(data.snapshot.position);
    setPosition(data.snapshot.position);
  };

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
            <div>
              <Flex
                justify="end"
                mt="2"
                px="3"
              >
                <Button
                  type="button"
                  size="1"
                  onClick={handleFocusPosition}
                >
                  위치 보기
                </Button>
              </Flex>
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
            </div>
          </>
        )
        : null}
    </div>
  );
};
