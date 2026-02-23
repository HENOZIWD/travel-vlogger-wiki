import { AdvancedMarker } from '@vis.gl/react-google-maps';
import { usePosition } from '../../shared/hooks/usePosition';

export const SelectedPosition = () => {
  const { position } = usePosition();

  if (!position) return null;

  return <AdvancedMarker position={position} />;
};
