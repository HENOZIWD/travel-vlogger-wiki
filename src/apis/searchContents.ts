import type { Content } from '../utils/type';
import { fetchInstance } from './instance';

interface SearchContentsParams {
  q: string | null;
  tags: string | null;
}
type SearchContentsResponse = Content[];

export async function searchContents({ q, tags }: SearchContentsParams) {
  const searchParams = new URLSearchParams();

  if (q) searchParams.append('q', q);
  if (tags) searchParams.append('tags', tags);

  return (await fetchInstance.get<SearchContentsResponse>(`search?${searchParams.toString()}`)).json();
}
