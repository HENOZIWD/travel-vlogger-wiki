import './App.css';
import { css } from '@emotion/react';
import { MarkerList } from './components/MarkerList';
import { WorldMap } from './components/WorldMap';
import { ContentRegisterForm } from './components/ContentRegisterForm';
import { PlusIcon } from '@radix-ui/react-icons';
import { useContentRegisterFormState } from './hooks/useContentRegisterFormState';
import { AdvancedMarker } from '@vis.gl/react-google-maps';
import { ContentDetail } from './components/ContentDetail';
import { useSearchParams } from 'react-router';

function App() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { position } = useContentRegisterFormState();

  const isRegistering = searchParams.get('register') === 'true';

  const handleOpenRegisterForm = () => {
    setSearchParams((prev) => {
      const nextParams = new URLSearchParams(prev);
      nextParams.delete('content');
      nextParams.set('register', 'true');
      return nextParams;
    });
  };

  return (
    <div css={css`
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: row;
        `}
    >
      <ContentRegisterForm />
      <ContentDetail />
      <WorldMap>
        <MarkerList />
        {isRegistering
          ? <AdvancedMarker position={position} />
          : null}
        {!isRegistering
          ? (
            <button
              type="button"
              css={css`
                  box-shadow: 0 0 8px 1px gray;
                  position: absolute;
                  bottom: 2rem;
                  left: 50%;
                  transform: translateX(-50%);
                `}
              onClick={handleOpenRegisterForm}
            >
              <PlusIcon css={css`
                    width: 1.25rem;
                    height: 1.25rem;
                  `}
              />
            </button>
          )
          : null}
      </WorldMap>
    </div>
  );
}

export default App;
