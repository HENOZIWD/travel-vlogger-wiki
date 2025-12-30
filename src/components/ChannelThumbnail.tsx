import { css } from '@emotion/react';

interface ChannelThumbnailProps {
  title: string;
  thumbnailDefault: string;
  thumbnailMedium: string;
  thumbnailHigh: string;
}

export const ChannelThumbnail = ({
  title,
  thumbnailDefault,
  thumbnailMedium,
  thumbnailHigh,
}: ChannelThumbnailProps) => {
  return (
    <img
      src={thumbnailDefault}
      alt={title}
      srcSet={`
        ${thumbnailDefault} 88w,
        ${thumbnailMedium} 240w,
        ${thumbnailHigh} 800w
      `}
      sizes="2.5rem"
      css={css`
        width: 2.5rem;
        height: 2.5rem;
        border-radius: 9999px;
      `}
    />
  );
};
