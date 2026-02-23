import { getSessionId } from '../../shared/utils/session';
import type { Tag } from '../../shared/utils/type';
import { fetchInstance } from '../../shared/apis/instance';

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
