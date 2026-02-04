import { getSessionId } from '../utils/storage';
import { fetchInstance } from './instance';

interface RegisterContentParams {
  url: string;
  position: google.maps.LatLngLiteral;
  tagIds: number[];
}

export async function registerContent({ url, position, tagIds }: RegisterContentParams) {
  const clientId = getSessionId();
  return fetchInstance.post('contents', {
    json: {
      url,
      position,
      clientId,
      tagIds,
    },
  });
}
