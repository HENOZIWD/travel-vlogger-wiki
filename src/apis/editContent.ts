import { getSessionId } from '../utils/storage';
import { fetchInstance } from './instance';

interface EditContentParams {
  id: string;
  position: google.maps.LatLngLiteral;
  tagIds: number[];
}

export async function editContent({ id, position, tagIds }: EditContentParams) {
  const clientId = getSessionId();
  return fetchInstance.patch(`contents/${id}`, {
    json: {
      position,
      clientId,
      tagIds,
    },
  });
}
