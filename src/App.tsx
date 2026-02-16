import { ContentList } from './components/ContentList';
import { WorldMap } from './components/WorldMap';
import { ContentRegisterForm } from './components/ContentRegisterForm';
import { PlusIcon } from '@radix-ui/react-icons';
import { ContentDetail } from './components/ContentDetail';
import { Link, Route, Routes, useLocation } from 'react-router';
import { Box, Flex, IconButton } from '@radix-ui/themes';
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
      <Flex
        width="100%"
        height="100%"
        direction="row"
      >
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
        <Box
          width="100%"
          position="relative"
        >
          <Search />
          <NotificationListener />
          <WorldMap>
            <ContentList />
            <SelectedPosition />
            {!isRegistering
              ? (
                <IconButton
                  asChild
                  size="4"
                  radius="full"
                  css={css`
                    position: absolute;
                    bottom: 1rem;
                    left: 50%;
                    transform: translateX(-50%);
                    box-shadow: 0 0 8px 4px var(--accent-6);
                  `}
                >
                  <Link to="/register">
                    <PlusIcon
                      width="1.5rem"
                      height="1.5rem"
                    />
                  </Link>
                </IconButton>
              )
              : null}
          </WorldMap>
        </Box>
      </Flex>
    </APIProvider>
  );
};

export default App;
