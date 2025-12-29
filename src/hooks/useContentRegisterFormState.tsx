import { atom, useAtom } from 'jotai';
import { getVideoIdFromYoutubeURL } from '../utils/url';

const isRegisteringAtom = atom<boolean>(false);
const urlAtom = atom<string>('');
const positionAtom = atom<google.maps.LatLngLiteral>();

export const useContentRegisterFormState = () => {
  const [isRegistering, setIsRegistering] = useAtom(isRegisteringAtom);
  const [url, setUrl] = useAtom(urlAtom);
  const [position, setPosition] = useAtom(positionAtom);

  const resetFormState = () => {
    setUrl('');
    setPosition(undefined);
  };

  const errors = {
    url: !url
      ? 'Youtube 링크를 입력해주세요.'
      : !getVideoIdFromYoutubeURL(url)
        ? 'Youtube 링크가 유효하지 않습니다.'
        : null,
    position: !position ? '등록할 위치를 지도에서 선택해주세요.' : null,
  };

  const isValid = Object.values(errors).every((err) => err === null);

  return {
    isRegistering,
    setIsRegistering,
    resetFormState,
    errors,
    isValid,
    url,
    setUrl,
    position,
    setPosition,
  };
};
