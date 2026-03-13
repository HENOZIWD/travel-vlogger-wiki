import type { Content } from '../../shared/utils/type';
import { fetchInstance } from '../../shared/apis/instance';

interface SearchContentsParams {
  q: string | null;
  tags: string | null;
  sort: string | null;
  cursor: string | null;
}
interface SearchContentsResponse {
  data: Content[];
  nextCursor: string | null;
}

export async function searchContents({ q, tags, sort, cursor }: SearchContentsParams) {
  const searchParams = new URLSearchParams();

  if (q) searchParams.set('q', q);
  if (tags) searchParams.set('tags', tags);
  if (sort) searchParams.set('sort', sort);
  if (cursor) searchParams.set('cursor', cursor);

  return (await fetchInstance.get<SearchContentsResponse>(`search?${searchParams.toString()}`)).json();
}
