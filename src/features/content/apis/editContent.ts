import { getSessionId } from '../../shared/utils/session';
import type { Tag } from '../../shared/utils/type';
import { fetchInstance } from '../../shared/apis/instance';

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
