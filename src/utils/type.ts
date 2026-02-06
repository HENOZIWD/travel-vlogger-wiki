export interface Tag {
  id: number;
  name: string;
}

export interface Content {
  id: string;
  position: google.maps.LatLngLiteral;
  channel: {
    title: string;
    thumbnailDefault: string;
    thumbnailMedium: string;
    thumbnailHigh: string;
  };
  title: string;
  tags: Tag[];
  publishedAt: string;
}

export interface ContentDetail {
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
  tags: Tag[];
  position: google.maps.LatLngLiteral;
}

export interface ContentHistory {
  id: string;
  createdAt: string;
  snapshot: {
    tags: Tag[];
    position: google.maps.LatLngLiteral;
  };
  editor: {
    id: string;
    maskedAddress: string;
  };
}
