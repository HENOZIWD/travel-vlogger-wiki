import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router';
import { getContentDetail } from '../apis/getContentDetail';
import { css } from '@emotion/react';
import { ChannelThumbnail } from './ChannelThumbnail';
import { Drawer } from './Drawer';
import { EmbedYoutubePlayer } from './EmbedYoutubePlayer';

export const ContentDetail = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const contentId = searchParams.get('content');

  const { data, isPending, isError } = useQuery({
    queryKey: ['contentDetail', contentId],
    queryFn: () => getContentDetail({ id: contentId! }),
    enabled: !!contentId,
  });

  const handleCloseDetail = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete('content');
    setSearchParams(newParams);
  };

  if (!contentId) return null;

  return (
    <Drawer
      key={contentId}
      onClose={handleCloseDetail}
    >
      <div>
        {isPending
          ? '불러오는 중...'
          : isError
            ? '정보를 불러오지 못했습니다.'
            : (
              <>
                <EmbedYoutubePlayer id={data.id} />
                <div css={css`
                    padding: 0 0.75rem;
                  `}
                >
                  <h1 css={css`
                    font-size: 1.25rem;
                    margin: 0.75rem 0 0.5rem;
                  `}
                  >
                    {data.title}
                  </h1>
                  <div css={css`
                      display: flex;
                      flex-direction: row;
                      align-items: center;
                      gap: 0.625rem;
                    `}
                  >
                    <ChannelThumbnail
                      title={data.channel.title}
                      thumbnailDefault={data.channel.thumbnailDefault}
                      thumbnailMedium={data.channel.thumbnailMedium}
                      thumbnailHigh={data.channel.thumbnailHigh}
                    />
                    {data.channel.customUrl
                      ? (
                        <a
                          href={`https://youtube.com/${data.channel.customUrl}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {data.channel.title}
                        </a>
                      )
                      : <div>{data.channel.title}</div>}
                  </div>
                  <div css={css`
                      display: flex;
                      flex-direction: column;
                      margin: 0.5rem 0;
                      gap: 0.25rem;
                    `}
                  >
                    <div>
                      업로드 날짜:
                      {' '}
                      {data.publishedAt}
                    </div>
                    <div>
                      조회수:
                      {' '}
                      {data.viewCount}
                    </div>
                    <div>
                      좋아요:
                      {' '}
                      {data.likeCount}
                    </div>
                  </div>
                </div>
              </>
            )}
      </div>
    </Drawer>
  );
};
