import { useAtom } from 'jotai';
import { atomWithStorage, createJSONStorage } from 'jotai/utils';
import { useLayoutEffect, useMemo, useRef } from 'react';
import { throttle } from '../utils/throttle';

const storage = createJSONStorage<number>(() => sessionStorage);
const scrollAtom = atomWithStorage<number>('scroll', 0, storage);

export const useScrollRestoration = <T extends HTMLElement>() => {
  const scrollRef = useRef<T>(null);
  const [scroll, setScroll] = useAtom(scrollAtom);

  const throttledSaveScroll = useMemo(
    () => throttle((pos: number) => setScroll(pos), 500),
    [setScroll],
  );

  useLayoutEffect(() => {
    const scrollBox = scrollRef.current;
    if (!scrollBox) return;

    scrollBox.scrollTop = scroll ?? 0;

    const handleScroll = () => throttledSaveScroll(scrollBox.scrollTop);
    scrollBox.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      scrollBox.removeEventListener('scroll', handleScroll);
      setScroll(scrollBox.scrollTop);
    };
  }, []);

  return scrollRef;
};
