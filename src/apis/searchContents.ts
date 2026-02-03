import type { Content, Tag } from '../utils/type';
import { fetchInstance } from './instance';

interface SearchContentsParams {
  query: string;
  tags: Tag[];
}
type SearchContentsResponse = Content[];

export async function searchContents({ query, tags }: SearchContentsParams) {
  return (await fetchInstance.get<SearchContentsResponse>(`search?q=${query}&tags=${tags.map((t) => t.id).join(',')}`)).json();
}
