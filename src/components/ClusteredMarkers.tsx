import { useCallback } from 'react';
import Supercluster, { type ClusterProperties } from 'supercluster';
import type { FeatureCollection, GeoJsonProperties, Point } from 'geojson';
import { useSupercluster } from '../hooks/useSupercluster';
import { Marker } from './Marker';
import { Cluster } from './Cluster';
import type { Marker as MarkerData } from '../utils/marker';

interface ClusteredMarkersProps { geojson: FeatureCollection<Point> }

const superclusterOptions: Supercluster.Options<
  GeoJsonProperties,
  ClusterProperties
> = {
  extent: 256,
  radius: 60,
  maxZoom: 18,
};

export const ClusteredMarkers = ({ geojson }: ClusteredMarkersProps) => {
  const { clusters, getLeaves } = useSupercluster(geojson, superclusterOptions);

  const handleClusterClick = useCallback(
    (_marker: google.maps.marker.AdvancedMarkerElement, clusterId: number) => {
      const leaves = getLeaves(clusterId);

      console.log(leaves);
    },
    [getLeaves],
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

        const featureProperties = feature.properties as MarkerData;

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
