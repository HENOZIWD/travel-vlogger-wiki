import type { Content } from '../../shared/utils/type';
import { fetchInstance } from '../../shared/apis/instance';

type GetContentsResponse = Content[];

export async function getContents(bound: google.maps.LatLngBoundsLiteral) {
  const { east, west, south, north } = bound;
  return (await fetchInstance.get<GetContentsResponse>(
    `contents?e=${east}&w=${west}&s=${south}&n=${north}`,
  )).json();
}
