import { fetchInstance } from './instance';

type SearchContentsResponse = {
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
  title: string;
}[];

export async function searchContents(query: string) {
  return (await fetchInstance.get<SearchContentsResponse>(`search?q=${query}`)).json();
}
