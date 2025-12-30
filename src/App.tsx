import './App.css';
import { css } from '@emotion/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MarkerList } from './components/MarkerList';
import { WorldMap } from './components/WorldMap';
import { ContentRegisterForm } from './components/ContentRegisterForm';
import { PlusIcon } from '@radix-ui/react-icons';
import { useContentRegisterFormState } from './hooks/useContentRegisterFormState';
import { AdvancedMarker } from '@vis.gl/react-google-maps';
import { BrowserRouter } from 'react-router';
import { ContentDetail } from './components/ContentDetail';

const queryClient = new QueryClient();

function App() {
  const {
    isRegistering,
    setIsRegistering,
    position,
  } = useContentRegisterFormState();

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <div css={css`
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: row;
        `}
        >
          {isRegistering
            ? (
              <ContentRegisterForm />
            )
            : null}
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
                  onClick={() => setIsRegistering(true)}
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
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
