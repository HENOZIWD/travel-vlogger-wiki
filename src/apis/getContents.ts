import { fetchInstance } from './instance';

type GetContentsResponse = {
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
  return (await fetchInstance.get<GetContentsResponse>('contents')).json();
}
