import type { Tag } from '../../shared/utils/type';

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
