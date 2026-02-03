import type { Content } from '../utils/type';
import { fetchInstance } from './instance';

type SearchContentsResponse = Content[];

export async function searchContents(query: string) {
  return (await fetchInstance.get<SearchContentsResponse>(`search?q=${query}`)).json();
}
