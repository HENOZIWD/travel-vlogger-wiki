import { ContentList } from './components/ContentList';
import { WorldMap } from './components/WorldMap';
import { ContentRegisterForm } from './components/ContentRegisterForm';
import { PlusIcon } from '@radix-ui/react-icons';
import { ContentDetail } from './components/ContentDetail';
import { Link, Route, Routes, useLocation } from 'react-router';
import { Flex, IconButton } from '@radix-ui/themes';
import { css } from '@emotion/react';
import { SelectedPosition } from './components/SelectedPosition';
import { NotificationListener } from './components/NotificationListener';

function App() {
  const location = useLocation();
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
    </Flex>
  );
}

export default App;
