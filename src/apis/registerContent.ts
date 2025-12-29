import { fetchInstance } from './instance';

interface RegisterContentParams {
  url: string;
  positions: google.maps.LatLngLiteral[];
}

export async function registerContent({ url, positions }: RegisterContentParams) {
  return fetchInstance.post('contents', {
    json: {
      url,
      positions,
    },
  });
}
