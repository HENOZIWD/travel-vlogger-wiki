import { AdvancedMarker } from '@vis.gl/react-google-maps';
import { useLocation, useSearchParams } from 'react-router';
import { usePosition } from '../hooks/usePosition';

export const SelectedPosition = () => {
  const { position } = usePosition();

  const location = useLocation();
  const [searchParams] = useSearchParams();

  const isRegistering = location.pathname === '/register';
  const isEditing = searchParams.get('edit') === 'true';

  if (!(isRegistering || isEditing)) return null;
  if (!position) return null;

  return <AdvancedMarker position={position} />;
};
