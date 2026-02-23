import { atom, useAtom } from 'jotai';
import { useCallback } from 'react';

const positionAtom = atom<google.maps.LatLngLiteral | null>(null);

export const usePosition = () => {
  const [position, setPosition] = useAtom(positionAtom);

  const resetPosition = useCallback(() => {
    setPosition(null);
  }, [setPosition]);

  return {
    position,
    setPosition,
    resetPosition,
  };
};
