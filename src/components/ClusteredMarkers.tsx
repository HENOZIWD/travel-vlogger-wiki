import { useCallback } from 'react';
import Supercluster, { type ClusterProperties } from 'supercluster';
import type { Feature, FeatureCollection, GeoJsonProperties, Point } from 'geojson';
import { useSupercluster } from '../hooks/useSupercluster';
import { Marker } from './Marker';
import { Cluster } from './Cluster';
import type { Content } from '../utils/type';

interface ClusteredMarkersProps {
  geojson: FeatureCollection<Point>;
  setInfoWindowData: (
    data: {
      anchor: google.maps.marker.AdvancedMarkerElement;
      features: Feature<Point>[];
    } | null,
  ) => void;
}

const superclusterOptions: Supercluster.Options<
  GeoJsonProperties,
  ClusterProperties
> = {
  extent: 256,
  radius: 60,
  maxZoom: 18,
};

export const ClusteredMarkers = ({ geojson, setInfoWindowData }: ClusteredMarkersProps) => {
  const { clusters, getLeaves } = useSupercluster(geojson, superclusterOptions);

  const handleClusterClick = useCallback(
    (marker: google.maps.marker.AdvancedMarkerElement, clusterId: number) => {
      const leaves = getLeaves(clusterId);

      const sortedLeaves = [...leaves].sort((a, b) =>
        (b.properties as Content).publishedAt > (a.properties as Content).publishedAt
          ? 1
          : -1,
      );

      setInfoWindowData({
        anchor: marker,
        features: sortedLeaves,
      });
    },
    [getLeaves, setInfoWindowData],
  );

  return (
    <>
      {clusters.map((feature) => {
        const [lng, lat] = feature.geometry.coordinates;

        const isCluster: boolean = feature.properties?.cluster;

        if (isCluster) {
          const clusterProperties = feature.properties as ClusterProperties;

          return (
            <Cluster
              key={clusterProperties.cluster_id}
              clusterId={clusterProperties.cluster_id}
              position={{
                lat,
                lng,
              }}
              markerCount={clusterProperties.point_count}
              onClusterClick={handleClusterClick}
            />
          );
        }

        const featureProperties = feature.properties as Content;

        return (
          <Marker
            key={feature.id}
            position={{
              lat,
              lng,
            }}
            data={featureProperties}
          />
        );
      })}
    </>
  );
};
