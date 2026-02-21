import { css } from '@emotion/react';
import { PlusIcon } from '@radix-ui/react-icons';
import { IconButton } from '@radix-ui/themes';
import { Link, useLocation } from 'react-router';

export const ContentRegisterButton = () => {
  const location = useLocation();
  const isRegistering = location.pathname === '/register';

  if (isRegistering) return null;

  return (
    <IconButton
      asChild
      size="4"
      css={css`
        position: absolute;
        z-index: 9999;
        top: 9rem;
        right: 1rem;
      `}
    >
      <Link
        to="/register"
        aria-label="콘텐츠 등록하기"
      >
        <PlusIcon
          width="1.5rem"
          height="1.5rem"
        />
      </Link>
    </IconButton>
  );
};
