import './App.css';
import { css } from '@emotion/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WorldMap } from './components/worldMap';
import { MarkerList } from './components/MarkerList';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div css={css`
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: row;
        `}
      >
        <WorldMap>
          <MarkerList />
        </WorldMap>
      </div>
    </QueryClientProvider>
  );
}

export default App;
