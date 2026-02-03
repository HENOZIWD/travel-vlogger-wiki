import type { Content } from '../utils/type';
import { fetchInstance } from './instance';

type GetContentsResponse = Content[];

export async function getContents() {
  return (await fetchInstance.get<GetContentsResponse>('contents')).json();
}
