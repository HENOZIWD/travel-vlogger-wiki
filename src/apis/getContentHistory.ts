import type { ContentHistory } from '../utils/type';
import { fetchInstance } from './instance';

interface GetContentHistoryParams { id: string | undefined }
type GetContentHistoryResponse = ContentHistory[];

export async function getContentHistory({ id }: GetContentHistoryParams) {
  if (!id) throw new Error('콘텐츠 ID가 유효하지 않습니다.');
  return (await fetchInstance.get<GetContentHistoryResponse>(`contents/${id}/history`)).json();
}
