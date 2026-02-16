import type { Content } from '../utils/type';
import { fetchInstance } from './instance';

interface SearchContentsParams {
  q: string | null;
  tags: string | null;
  cursor: string | null;
}
interface SearchContentsResponse {
  data: Content[];
  nextCursor: string | null;
}

export async function searchContents({ q, tags, cursor }: SearchContentsParams) {
  const searchParams = new URLSearchParams();

  if (q) searchParams.append('q', q);
  if (tags) searchParams.append('tags', tags);
  if (cursor) searchParams.append('cursor', cursor);

  return (await fetchInstance.get<SearchContentsResponse>(`search?${searchParams.toString()}`)).json();
}
