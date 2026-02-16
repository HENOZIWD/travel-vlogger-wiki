'use client';

import { css } from '@emotion/react';
import { ChevronLeftIcon, Cross2Icon } from '@radix-ui/react-icons';
import { Box, Flex, IconButton } from '@radix-ui/themes';
import type { ReactNode } from 'react';
import { useNavigate } from 'react-router';

interface DrawerProps { children?: ReactNode }

export const Drawer = ({ children }: DrawerProps) => {
  const navigate = useNavigate();

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
      <Flex justify="between">
        <IconButton
          type="button"
          onClick={() => navigate(-1)}
          variant="soft"
          size="3"
        >
          <ChevronLeftIcon
            width="1.25rem"
            height="1.25rem"
          />
        </IconButton>
        <IconButton
          type="button"
          onClick={() => navigate('/')}
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
