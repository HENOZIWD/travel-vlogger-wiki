import { ContentList } from './components/ContentList';
import { WorldMap } from './components/WorldMap';
import { ContentRegisterForm } from './components/ContentRegisterForm';
import { PlusIcon } from '@radix-ui/react-icons';
import { ContentDetail } from './components/ContentDetail';
import { Link, Route, Routes, useLocation } from 'react-router';
import { IconButton } from '@radix-ui/themes';
import { css } from '@emotion/react';
import { SelectedPosition } from './components/SelectedPosition';
import { NotificationListener } from './components/NotificationListener';
import { Search } from './components/Search';
import { APIProvider } from '@vis.gl/react-google-maps';
import { ContentHistory } from './components/ContentHistory';
import { Drawer } from './components/Drawer';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Suspense } from 'react';
import { SuspenseFallback } from './components/SuspenseFallback';
import { SearchContentResult } from './components/SearchContentResult';

export const App = () => {
  const location = useLocation();
  const isRegistering = location.pathname === '/register';

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
          {!isRegistering
            ? (
              <IconButton
                asChild
                size="4"
                css={css`
                  position: absolute;
                  z-index: 9999;
                  top: 5rem;
                  right: 1rem;
                `}
              >
                <Link
                  to="/register"
                  aria-label="콘텐츠 등록하기"
                >
                  <PlusIcon
                    width="1.5rem"
                    height="1.5rem"
                  />
                </Link>
              </IconButton>
            )
            : null}
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
