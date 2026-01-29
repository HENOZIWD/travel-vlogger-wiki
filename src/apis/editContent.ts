import { getSessionId } from '../utils/storage';
import { fetchInstance } from './instance';

interface EditContentParams {
  id: string;
  positions: google.maps.LatLngLiteral[];
  tagIds: number[];
}

export async function editContent({ id, positions, tagIds }: EditContentParams) {
  const clientId = getSessionId();
  return fetchInstance.patch(`contents/${id}`, {
    json: {
      positions,
      clientId,
      tagIds,
    },
  });
}
