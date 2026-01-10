import { getSessionId } from '../utils/storage';
import { fetchInstance } from './instance';

interface RegisterContentParams {
  url: string;
  positions: google.maps.LatLngLiteral[];
}

export async function registerContent({ url, positions }: RegisterContentParams) {
  const clientId = getSessionId();
  return fetchInstance.post('contents', {
    json: {
      url,
      positions,
      clientId,
    },
  });
}
