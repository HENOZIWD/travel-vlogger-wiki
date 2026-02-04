import { getSessionId } from '../utils/storage';
import type { Tag } from '../utils/type';
import { fetchInstance } from './instance';

interface EditContentParams {
  id: string;
  position: google.maps.LatLngLiteral;
  tags: Tag[];
}

export async function editContent({ id, position, tags }: EditContentParams) {
  const clientId = getSessionId();
  return fetchInstance.patch(`contents/${id}`, {
    json: {
      position,
      clientId,
      tags,
    },
  });
}
