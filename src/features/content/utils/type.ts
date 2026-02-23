import type { Tag } from '../../shared/utils/type';

export interface ContentDetail {
  id: string;
  title: string;
  publishedAt: string;
  viewCount: string;
  likeCount: string;
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
  tags: Tag[];
  position: google.maps.LatLngLiteral;
  overview: string | null;
}
