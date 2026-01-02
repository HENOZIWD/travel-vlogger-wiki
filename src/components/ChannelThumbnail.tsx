import { PersonIcon } from '@radix-ui/react-icons';
import { Avatar } from '@radix-ui/themes';

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
    <Avatar
      src={thumbnailDefault}
      alt={title}
      fallback={(
        <PersonIcon
          width="1.25rem"
          height="1.25rem"
        />
      )}
      srcSet={`
        ${thumbnailDefault} 88w,
        ${thumbnailMedium} 240w,
        ${thumbnailHigh} 800w
      `}
      sizes="2.5rem"
      radius="full"
      variant="solid"
    />
  );
};
