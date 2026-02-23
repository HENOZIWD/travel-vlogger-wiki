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
