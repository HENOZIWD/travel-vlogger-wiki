import { ContentList } from './features/marker/components/ContentList';
import { WorldMap } from './features/map/components/WorldMap';
import { ContentRegisterForm } from './features/content/components/ContentRegisterForm';
import { ContentDetail } from './features/content/components/ContentDetail';
import { Route, Routes } from 'react-router';
import { css } from '@emotion/react';
import { SelectedPosition } from './features/map/components/SelectedPosition';
import { NotificationListener } from './features/notification/components/NotificationListener';
import { Search } from './features/search/components/Search';
import { APIProvider } from '@vis.gl/react-google-maps';
import { ContentHistory } from './features/history/components/ContentHistory';
import { Drawer } from './features/shared/components/Drawer';
import { ErrorBoundary } from './features/shared/components/ErrorBoundary';
import { Suspense } from 'react';
import { SuspenseFallback } from './features/shared/components/SuspenseFallback';
import { SearchContentResult } from './features/search/components/SearchContentResult';
import { ContentRegisterButton } from './features/content/components/ContentRegisterButton';
import { ThemeToggleButton } from './features/theme/components/ThemeToggleButton';

export const App = () => {
  return (
    <APIProvider
      apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
      region="KR"
    >
      <div css={css`
          position: relative;
          display: flex;
          width: 100%;
          height: 100%;
          flex-direction: row;

          @media screen and (max-width: 54rem) {
            flex-direction: column-reverse;
          }
        `}
      >
        <aside>
          <Routes>
            <Route
              path="register"
              element={(
                <Drawer>
                  <ErrorBoundary>
                    <ContentRegisterForm />
                  </ErrorBoundary>
                </Drawer>
              )}
            />
            <Route
              path="content/:contentId"
              element={(
                <Drawer>
                  <ErrorBoundary>
                    <Suspense fallback={<SuspenseFallback />}>
                      <ContentDetail />
                    </Suspense>
                  </ErrorBoundary>
                </Drawer>
              )}
            />
            <Route
              path="content/:contentId/history"
              element={(
                <Drawer>
                  <ErrorBoundary>
                    <Suspense fallback={<SuspenseFallback />}>
                      <ContentHistory />
                    </Suspense>
                  </ErrorBoundary>
                </Drawer>
              )}
            />
            <Route
              path="search"
              element={(
                <Drawer>
                  <ErrorBoundary>
                    <Suspense fallback={<SuspenseFallback />}>
                      <SearchContentResult />
                    </Suspense>
                  </ErrorBoundary>
                </Drawer>
              )}
            />
          </Routes>
        </aside>
        <main css={css`
            width: 100%;
            height: 100%;
            position: relative;
          `}
        >
          <Search />
          <NotificationListener />
          <ThemeToggleButton />
          <ContentRegisterButton />
          <WorldMap>
            <ContentList />
            <SelectedPosition />
          </WorldMap>
        </main>
      </div>
    </APIProvider>
  );
};

export default App;
