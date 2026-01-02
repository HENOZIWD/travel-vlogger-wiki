import './App.css';
import { css } from '@emotion/react';
import { MarkerList } from './components/MarkerList';
import { WorldMap } from './components/WorldMap';
import { ContentRegisterForm } from './components/ContentRegisterForm';
import { PlusIcon } from '@radix-ui/react-icons';
import { useContentRegisterFormState } from './hooks/useContentRegisterFormState';
import { AdvancedMarker } from '@vis.gl/react-google-maps';
import { ContentDetail } from './components/ContentDetail';
import { Link, Route, Routes, useLocation } from 'react-router';

function App() {
  const location = useLocation();
  const { position } = useContentRegisterFormState();

  const isRegistering = location.pathname === '/register';

  return (
    <div css={css`
        position: relative;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: row;
      `}
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
            <Link
              to="/register"
              css={css`
                border-radius: 9999px;
                display: flex;
                border: 1px solid transparent;
                padding: 0.75rem;
                box-shadow: 0 0 8px 1px gray;
                position: absolute;
                bottom: 2rem;
                left: 50%;
                transform: translateX(-50%);
                color: #081017;
                background-color: #f9f9f9;
              `}
            >
              <PlusIcon css={css`
                  width: 1.25rem;
                  height: 1.25rem;
                `}
              />
            </Link>
          )
          : null}
      </WorldMap>
    </div>
  );
}

export default App;
