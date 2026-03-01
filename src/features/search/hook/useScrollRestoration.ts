import { useAtom } from 'jotai';
import { atomWithStorage, createJSONStorage } from 'jotai/utils';
import { useLayoutEffect, useRef } from 'react';

type Scroll = Record<string, number>;

const storage = createJSONStorage<Scroll>(() => sessionStorage);
const scrollAtom = atomWithStorage<Scroll>('scroll', {}, storage);

export const useScrollRestoration = <T extends HTMLElement>(key: string) => {
  const scrollRef = useRef<T>(null);
  const [scroll, setScroll] = useAtom(scrollAtom);

  useLayoutEffect(() => {
    const scrollBox = scrollRef.current;
    if (!scrollBox) return;

    scrollBox.scrollTop = scroll[key] ?? 0;

    const handleScroll = () => {
      setScroll((prev) => ({
        ...prev,
        [key]: scrollBox.scrollTop,
      }));
    };
    scrollBox.addEventListener('scrollend', handleScroll, { passive: true });

    return () => {
      scrollBox.removeEventListener('scrollend', handleScroll);
      setScroll((prev) => ({
        ...prev,
        [key]: scrollBox.scrollTop,
      }));
    };
  }, [key]);

  return scrollRef;
};
