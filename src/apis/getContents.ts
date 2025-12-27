import { fetchInstance } from './instance';

type getContentsResponse = {
  id: string;
  positions: {
    lat: number;
    lng: number;
  }[];
  channel: {
    title: string;
    thumbnailDefault: string;
    thumbnailMedium: string;
    thumbnailHigh: string;
  };
}[];

export async function getContents() {
  return (await fetchInstance.get<getContentsResponse>('contents')).json();
}
