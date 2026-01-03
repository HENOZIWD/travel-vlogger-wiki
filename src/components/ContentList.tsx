import { useQuery } from '@tanstack/react-query';
import { getContents } from '../apis/getContents';
import { ClusteredMarkers } from './ClusteredMarkers';
import { useLocation, useSearchParams } from 'react-router';

export const ContentList = () => {
  const { isPending, isError, data } = useQuery({
    queryKey: ['markerList'],
    queryFn: getContents,
  });

  const location = useLocation();
  const [searchParams] = useSearchParams();

  const isRegistering = location.pathname === '/register';
  const isEditing = searchParams.get('edit') === 'true';

  if (isPending || isError) return null;

  return <ClusteredMarkers data={isRegistering || isEditing ? [] : data} />;
};
