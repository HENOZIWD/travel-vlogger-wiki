import type { Tag } from '../utils/type';
import { fetchInstance } from './instance';

type GetAvailableTagsResponse = Tag[];

export async function getAvailableTags() {
  return (await fetchInstance.get<GetAvailableTagsResponse>('tags')).json();
}
