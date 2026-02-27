import type { FeatureCollection, GeoJsonProperties, Point } from 'geojson';
import Supercluster, { type ClusterProperties } from 'supercluster';
import { useCallback, useEffect, useMemo, useReducer } from 'react';
import { useMapViewport } from '../../shared/hooks/useMapViewport';

export const useSupercluster = <T extends GeoJsonProperties>(
  geojson: FeatureCollection<Point, T>,
  superclusterOptions: Supercluster.Options<T, ClusterProperties>,
) => {
  // create the clusterer and keep it
  const clusterer = useMemo(() => {
    return new Supercluster(superclusterOptions);
  }, [superclusterOptions]);

  // version-number for the data loaded into the clusterer
  // (this is needed to trigger updating the clusters when data was changed)
  const [version, dataWasUpdated] = useReducer((x: number) => x + 1, 0);

  // when data changes, load it into the clusterer
  useEffect(() => {
    clusterer.load(geojson.features);
    dataWasUpdated();
  }, [clusterer, geojson]);

  // get bounding-box and zoomlevel from the map
  const { mapViewport } = useMapViewport();

  const padding = 100;
  const degreesPerPixel = (360 / (Math.pow(2, mapViewport.zoom) * 256));
  const paddingDegrees = degreesPerPixel * padding;
  const isFullLng = mapViewport.zoom <= 3;

  const w = isFullLng ? -180 : mapViewport.bounds.west - paddingDegrees;
  const e = isFullLng ? 180 : mapViewport.bounds.east + paddingDegrees;
  const s = Math.max(-90, mapViewport.bounds.south - paddingDegrees);
  const n = Math.min(90, mapViewport.bounds.north + paddingDegrees);

  // retrieve the clusters within the current viewport
  const clusters = useMemo(() => {
    // don't try to read clusters before data was loaded into the clusterer (version===0),
    // otherwise getClusters will crash
    if (!clusterer || version === 0) return [];

    return clusterer.getClusters([w, s, e, n], mapViewport.zoom);
  }, [version, clusterer, w, s, e, n, mapViewport.zoom]);

  // create callbacks to expose supercluster functionality outside of this hook
  const getChildren = useCallback(
    (clusterId: number) => clusterer.getChildren(clusterId),
    [clusterer],
  );

  // note: here, the paging that would be possible is disabled; we found this
  // has no significant performance impact when it's just used in a click event handler.
  const getLeaves = useCallback(
    (clusterId: number) => clusterer.getLeaves(clusterId, Infinity),
    [clusterer],
  );

  const getClusterExpansionZoom = useCallback(
    (clusterId: number) => clusterer.getClusterExpansionZoom(clusterId),
    [clusterer],
  );

  return {
    clusters,
    getChildren,
    getLeaves,
    getClusterExpansionZoom,
  };
};
