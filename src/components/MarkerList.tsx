import { useQuery } from '@tanstack/react-query';
import { getContents } from '../apis/getContents';
import { ClusteredMarkers } from './ClusteredMarkers';

export const MarkerList = () => {
  const { isPending, isError, data } = useQuery({
    queryKey: ['markerList'],
    queryFn: getContents,
  });

  if (isPending || isError) return null;

  return (
    <ClusteredMarkers data={data} />
  );
};
