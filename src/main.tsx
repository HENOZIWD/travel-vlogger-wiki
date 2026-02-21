import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Route, Routes } from 'react-router';
import { Theme } from '@radix-ui/themes';
import { ErrorBoundary } from './components/ErrorBoundary.tsx';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000,
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/*"
            element={(
              <Theme accentColor="indigo">
                <ErrorBoundary>
                  <App />
                </ErrorBoundary>
              </Theme>
            )}
          />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
);
