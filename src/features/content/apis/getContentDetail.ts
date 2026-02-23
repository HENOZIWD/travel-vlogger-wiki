import { fetchInstance } from '../../shared/apis/instance';
import type { ContentDetail } from '../utils/type';

interface GetContentDetailParams { id: string | undefined }
type GetContentDetailResponse = ContentDetail;

export async function getContentDetail({ id }: GetContentDetailParams) {
  if (!id) throw new Error('콘텐츠 ID가 유효하지 않습니다.');
  return (await fetchInstance.get<GetContentDetailResponse>(`contents/${id}`)).json();
}
