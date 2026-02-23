import { IconButton } from '@radix-ui/themes';
import { useTheme } from '../../shared/hooks/useTheme';
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { css } from '@emotion/react';

export const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <IconButton
      type="button"
      aria-label={theme === 'dark' ? '라이트 모드로 변경' : '다크 모드로 변경'}
      onClick={toggleTheme}
      size="4"
      css={css`
        position: absolute;
        z-index: 9999;
        top: 5rem;
        right: 1rem;
      `}
    >
      {theme === 'dark'
        ? (
          <MoonIcon
            width="1.25rem"
            height="1.25rem"
          />
        )
        : (
          <SunIcon
            width="1.25rem"
            height="1.25rem"
          />
        )}
    </IconButton>
  );
};
