import { PersonIcon } from '@radix-ui/react-icons';
import { Avatar } from '@radix-ui/themes';
import type { Responsive } from '@radix-ui/themes/props';

interface ChannelThumbnailProps {
  title: string;
  size?: Responsive<'1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'>;
  thumbnailDefault: string;
  thumbnailMedium: string;
  thumbnailHigh: string;
}

export const ChannelThumbnail = ({
  title,
  size = '3',
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
      size={size}
      radius="full"
      variant="solid"
    />
  );
};
