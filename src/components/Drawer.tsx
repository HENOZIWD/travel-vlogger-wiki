import { css } from '@emotion/react';
import { Cross2Icon } from '@radix-ui/react-icons';
import { Box, Flex, IconButton } from '@radix-ui/themes';
import type { MouseEventHandler, ReactNode } from 'react';

interface DrawerProps {
  children?: ReactNode;
  onClose: MouseEventHandler<HTMLButtonElement>;
}

export const Drawer = ({ children, onClose }: DrawerProps) => {
  return (
    <Box
      width="30rem"
      height="100%"
      css={css`
        flex-shrink: 0;
        box-shadow: 1px 0 8px 0 var(--gray-6);
        z-index: 9999;
      `}
    >
      <Flex justify="end">
        <IconButton
          type="button"
          onClick={onClose}
          variant="soft"
          size="3"
        >
          <Cross2Icon
            width="1.25rem"
            height="1.25rem"
          />
        </IconButton>
      </Flex>
      {children}
    </Box>
  );
};
