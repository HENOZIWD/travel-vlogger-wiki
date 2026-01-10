export interface Marker {
  id: string;
  positions: {
    lat: number;
    lng: number;
  }[];
  title: string;
  channel: {
    title: string;
    thumbnailDefault: string;
    thumbnailMedium: string;
    thumbnailHigh: string;
  };
};
