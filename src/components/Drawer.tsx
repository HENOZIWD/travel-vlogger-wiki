import { css } from '@emotion/react';
import { Cross2Icon } from '@radix-ui/react-icons';
import type { MouseEventHandler, ReactNode } from 'react';

interface DrawerProps {
  children?: ReactNode;
  onClose: MouseEventHandler<HTMLButtonElement>;
}

export const Drawer = ({ children, onClose }: DrawerProps) => {
  return (
    <div css={css`
        width: 30rem;
        height: 100%;
        flex-shrink: 0;
        box-shadow: 1px 0 8px -4px gray;
        z-index: 9999;
      `}
    >
      <div css={css`
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        `}
      >
        <button
          type="button"
          onClick={onClose}
        >
          <Cross2Icon css={css`
              width: 1.25rem;
              height: 1.25rem;
            `}
          />
        </button>
      </div>
      {children}
    </div>
  );
};
