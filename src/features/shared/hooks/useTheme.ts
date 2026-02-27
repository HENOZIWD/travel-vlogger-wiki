import { atom, useAtomValue, useSetAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

const themeAtom = atomWithStorage<'dark' | 'light'>(
  'theme',
  typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light',
);
const toggleThemeAtom = atom(
  null,
  (get, set) => {
    const currentTheme = get(themeAtom);
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    set(themeAtom, nextTheme);

    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.style.colorScheme = 'dark';
    }
    else {
      document.documentElement.classList.remove('dark');
      document.documentElement.style.colorScheme = 'light';
    }
  },
);

export const useTheme = () => {
  const theme = useAtomValue(themeAtom);
  const toggleTheme = useSetAtom(toggleThemeAtom);

  return {
    theme,
    toggleTheme,
  };
};
