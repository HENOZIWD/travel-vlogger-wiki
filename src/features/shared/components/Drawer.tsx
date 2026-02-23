'use client';

import { css } from '@emotion/react';
import { ChevronLeftIcon, Cross2Icon } from '@radix-ui/react-icons';
import { IconButton } from '@radix-ui/themes';
import type { ReactNode } from 'react';
import { useNavigate } from 'react-router';

interface DrawerProps { children?: ReactNode }

export const Drawer = ({ children }: DrawerProps) => {
  const navigate = useNavigate();

  return (
    <div css={css`
        display: flex;
        flex-direction: column;
        width: min(32rem, 50vw);
        height: 100%;
        flex-shrink: 0;
        box-shadow: 1px 0 8px 0 var(--gray-6);
        z-index: 9999;

        @media screen and (max-width: 54rem) {
          width: 100%;
          height: min(32rem, 50vh);
        }
      `}
    >
      <div css={css`
          display: flex;
          justify-content: space-between;
          box-shadow: 0 1px 0px 0px var(--gray-6);
        `}
      >
        <IconButton
          type="button"
          onClick={() => navigate(-1)}
          variant="soft"
          size="3"
          aria-label="뒤로가기"
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
          aria-label="닫기"
        >
          <Cross2Icon
            width="1.25rem"
            height="1.25rem"
          />
        </IconButton>
      </div>
      <div css={css`
          overflow-y: auto;
          flex-grow: 1;
        `}
      >
        {children}
      </div>
    </div>
  );
};
