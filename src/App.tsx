// import { css } from '@emotion/react';
import { MarkerList } from './components/MarkerList';
import { WorldMap } from './components/WorldMap';
import { ContentRegisterForm } from './components/ContentRegisterForm';
import { PlusIcon } from '@radix-ui/react-icons';
import { useContentRegisterFormState } from './hooks/useContentRegisterFormState';
import { AdvancedMarker } from '@vis.gl/react-google-maps';
import { ContentDetail } from './components/ContentDetail';
import { Link, Route, Routes, useLocation } from 'react-router';
import { Flex, IconButton } from '@radix-ui/themes';
import { css } from '@emotion/react';

function App() {
  const location = useLocation();
  const { position } = useContentRegisterFormState();

  const isRegistering = location.pathname === '/register';

  return (
    <Flex
      width="100%"
      height="100%"
      direction="row"
    >
      <Routes>
        <Route
          path="register"
          element={<ContentRegisterForm />}
        />
        <Route
          path="content/:contentId"
          element={<ContentDetail />}
        />
      </Routes>
      <WorldMap>
        <MarkerList />
        {isRegistering
          ? <AdvancedMarker position={position} />
          : null}
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
    </Flex>
  );
}

export default App;
