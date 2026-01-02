import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router';
import { getContentDetail } from '../apis/getContentDetail';
import { ChannelThumbnail } from './ChannelThumbnail';
import { Drawer } from './Drawer';
import { EmbedYoutubePlayer } from './EmbedYoutubePlayer';
import { formatNumber } from '../utils/format';
import { Box, DataList, Flex, Heading, Link as RadixLink, Text } from '@radix-ui/themes';

export const ContentDetail = () => {
  const { contentId } = useParams();
  const navigate = useNavigate();

  const { data, isPending, isError } = useQuery({
    queryKey: ['contentDetail', contentId],
    queryFn: () => getContentDetail({ id: contentId! }),
    enabled: !!contentId,
  });

  const handleCloseDetail = () => {
    navigate('/');
  };

  if (!contentId) return null;

  return (
    <Drawer
      key={contentId}
      onClose={handleCloseDetail}
    >
      {isPending
        ? '불러오는 중...'
        : isError
          ? '정보를 불러오지 못했습니다.'
          : (
            <>
              <EmbedYoutubePlayer id={data.id} />
              <Box px="3">
                <Heading
                  as="h1"
                  size="5"
                  weight="bold"
                  mt="4"
                  mb="3"
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
                <DataList.Root
                  size="2"
                  my="4"
                >
                  <DataList.Item align="center">
                    <DataList.Label minWidth="5rem">업로드 날짜</DataList.Label>
                    <DataList.Value>{new Date(data.publishedAt).toLocaleString()}</DataList.Value>
                  </DataList.Item>
                  <DataList.Item align="center">
                    <DataList.Label minWidth="5rem">조회수</DataList.Label>
                    <DataList.Value>{formatNumber(data.viewCount)}</DataList.Value>
                  </DataList.Item>
                  <DataList.Item align="center">
                    <DataList.Label minWidth="5rem">좋아요</DataList.Label>
                    <DataList.Value>{formatNumber(data.likeCount)}</DataList.Value>
                  </DataList.Item>
                </DataList.Root>
              </Box>
            </>
          )}
    </Drawer>
  );
};
