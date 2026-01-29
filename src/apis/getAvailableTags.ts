import { fetchInstance } from './instance';

type GetAvailableTagsResponse = {
  id: number;
  name: string;
}[];

export async function getAvailableTags() {
  return (await fetchInstance.get<GetAvailableTagsResponse>('tags')).json();
}
