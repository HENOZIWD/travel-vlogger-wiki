import { css } from '@emotion/react';
import { AspectRatio } from '@radix-ui/themes';

interface EmbedYoutubePlayerProps {
  id: string;
  title: string;
}

export const EmbedYoutubePlayer = ({ id, title }: EmbedYoutubePlayerProps) => {
  return (
    <AspectRatio ratio={16 / 9}>
      <iframe
        css={css`
          border: none;
        `}
        id="ytplayer"
        width="100%"
        height="100%"
        src={`https://www.youtube.com/embed/${id}?origin=http://localhost:5173`}
        title={title}
      >
      </iframe>
    </AspectRatio>
  );
};
