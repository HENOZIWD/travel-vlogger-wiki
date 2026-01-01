import { fetchInstance } from './instance';

interface GetContentDetailParams { id: string }
interface GetContentDetailResponse {
  id: string;
  title: string;
  publishedAt: string;
  viewCount: number;
  likeCount: number;
  lastEditorAddress: string;
  lastEditorId: string;
  channel: {
    id: string;
    title: string;
    customUrl: string | null;
    thumbnailDefault: string;
    thumbnailMedium: string;
    thumbnailHigh: string;
  };
}

export async function getContentDetail({ id }: GetContentDetailParams) {
  return (await fetchInstance.get<GetContentDetailResponse>(`contents/${id}`)).json();
}
