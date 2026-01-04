import { fetchInstance } from './instance';

interface EditContentParams {
  id: string;
  positions: google.maps.LatLngLiteral[];
}

export async function editContent({ id, positions }: EditContentParams) {
  return fetchInstance.patch(`contents/${id}`, { json: { positions } });
}
