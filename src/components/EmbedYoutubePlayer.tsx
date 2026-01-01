import { css } from '@emotion/react';

interface EmbedYoutubePlayerProps { id: string }

export const EmbedYoutubePlayer = ({ id }: EmbedYoutubePlayerProps) => {
  return (
    <div css={css`
        width: 100%;
        aspect-ratio: 16/9;
        display: flex;
      `}
    >
      <iframe
        css={css`
          border: none;
        `}
        id="ytplayer"
        width="100%"
        height="100%"
        src={`https://www.youtube.com/embed/${id}?origin=http://localhost:5173`}
      >
      </iframe>
    </div>
  );
};
