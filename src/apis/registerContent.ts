import { getSessionId } from '../utils/storage';
import type { Tag } from '../utils/type';
import { fetchInstance } from './instance';

interface RegisterContentParams {
  url: string;
  position: google.maps.LatLngLiteral;
  tags: Tag[];
}

export async function registerContent({ url, position, tags }: RegisterContentParams) {
  const clientId = getSessionId();
  return fetchInstance.post('contents', {
    json: {
      url,
      position,
      clientId,
      tags,
    },
  });
}
