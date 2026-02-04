import type { ContentHistory } from '../utils/type';
import { fetchInstance } from './instance';

interface GetContentHistoryParams { id: string }
type GetContentHistoryResponse = ContentHistory[];

export async function getContentHistory({ id }: GetContentHistoryParams) {
  return (await fetchInstance.get<GetContentHistoryResponse>(`contents/${id}/history`)).json();
}
