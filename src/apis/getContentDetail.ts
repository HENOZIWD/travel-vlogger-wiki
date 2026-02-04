import type { ContentDetail } from '../utils/type';
import { fetchInstance } from './instance';

interface GetContentDetailParams { id: string }
type GetContentDetailResponse = ContentDetail;

export async function getContentDetail({ id }: GetContentDetailParams) {
  return (await fetchInstance.get<GetContentDetailResponse>(`contents/${id}`)).json();
}
