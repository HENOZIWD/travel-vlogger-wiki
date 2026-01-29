import { getSessionId } from '../utils/storage';
import { fetchInstance } from './instance';

interface RegisterContentParams {
  url: string;
  positions: google.maps.LatLngLiteral[];
  tagIds: number[];
}

export async function registerContent({ url, positions, tagIds }: RegisterContentParams) {
  const clientId = getSessionId();
  return fetchInstance.post('contents', {
    json: {
      url,
      positions,
      clientId,
      tagIds,
    },
  });
}
