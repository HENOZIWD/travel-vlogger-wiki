import { useSuspenseQuery } from '@tanstack/react-query';
import { Link, useParams, useSearchParams } from 'react-router';
import { getContentDetail } from '../apis/getContentDetail';
import { ChannelThumbnail } from './ChannelThumbnail';
import { EmbedYoutubePlayer } from './EmbedYoutubePlayer';
import { formatNumber } from '../utils/format';
import { Badge, Button, Callout, DataList, Flex, Heading, Link as RadixLink, Text } from '@radix-ui/themes';
import { ContentEditForm } from './ContentEditForm';
import { useMap } from '@vis.gl/react-google-maps';
import { useEffect } from 'react';
import { InfoCircledIcon } from '@radix-ui/react-icons';
import { css } from '@emotion/react';

export const ContentDetail = () => {
  const { contentId } = useParams();

  const [searchParams, setSearchParams] = useSearchParams();

  const isEditing = searchParams.get('edit') === 'true';

  const { data } = useSuspenseQuery({
    queryKey: ['contentDetail', contentId],
    queryFn: () => getContentDetail({ id: contentId }),
  });

  const map = useMap();

  useEffect(() => {
    if (map && data) {
      map.panTo(data.position);
    }
  }, [map, data]);

  const handleOpenContentEditForm = () => {
    setSearchParams((prev) => {
      const nextParams = new URLSearchParams(prev);
      nextParams.set('edit', 'true');
      return nextParams;
    });
  };

  if (!contentId) return null;

  return (
    <div key={contentId}>
      <EmbedYoutubePlayer id={data.id} />
      <Flex
        px="3"
        py="4"
        direction="column"
        gap="4"
      >
        <Heading
          as="h1"
          size="5"
          weight="bold"
        >
          {data.title}
        </Heading>
        <Flex
          align="center"
          gap="3"
        >
          <ChannelThumbnail
            title={data.channel.title}
            thumbnailDefault={data.channel.thumbnailDefault}
            thumbnailMedium={data.channel.thumbnailMedium}
            thumbnailHigh={data.channel.thumbnailHigh}
          />
          {data.channel.customUrl
            ? (
              <RadixLink
                href={`https://youtube.com/${data.channel.customUrl}`}
                target="_blank"
                rel="noreferrer"
              >
                {data.channel.title}
              </RadixLink>
            )
            : <Text>{data.channel.title}</Text>}
        </Flex>
        {data.overview
          ? (
            <section css={css`
                display: flex;
                flex-direction: column;
                gap: 0.5rem;
                border-radius: 0.25rem;
                background-color: var(--gray-5);
                padding: 1rem;
              `}
            >
              <Heading
                as="h2"
                size="4"
              >
                동영상 개요
              </Heading>
              <Callout.Root size="1">
                <Callout.Icon><InfoCircledIcon /></Callout.Icon>
                <Callout.Text>AI가 분석하여 생성한 개요입니다.</Callout.Text>
              </Callout.Root>
              <div>
                {data.overview}
              </div>
            </section>
          )
          : null}
        <DataList.Root size="2">
          <DataList.Item align="center">
            <DataList.Label minWidth="5rem">업로드 날짜</DataList.Label>
            <DataList.Value>{new Date(data.publishedAt).toLocaleString()}</DataList.Value>
          </DataList.Item>
          <DataList.Item align="center">
            <DataList.Label minWidth="5rem">조회수</DataList.Label>
            <DataList.Value>{formatNumber(Number(data.viewCount))}</DataList.Value>
          </DataList.Item>
          <DataList.Item align="center">
            <DataList.Label minWidth="5rem">좋아요</DataList.Label>
            <DataList.Value>{formatNumber(Number(data.likeCount))}</DataList.Value>
          </DataList.Item>
          <DataList.Item align="center">
            <DataList.Label minWidth="5rem">태그</DataList.Label>
            <DataList.Value>
              <Flex
                wrap="wrap"
                gap="2"
                py="1"
              >
                {data.tags.map((tag) => (
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
        <RadixLink
          asChild
          size="2"
        >
          <Link to={`/content/${contentId}/history`}>편집 기록</Link>
        </RadixLink>
        {!isEditing
          ? (
            <Flex justify="end">
              <Button
                type="button"
                onClick={handleOpenContentEditForm}
              >
                편집하기
              </Button>
            </Flex>
          )
          : (
            <ContentEditForm
              key={contentId}
              id={contentId}
              prevPosition={data.position}
              prevTags={data.tags}
            />
          )}
      </Flex>
    </div>
  );
};
