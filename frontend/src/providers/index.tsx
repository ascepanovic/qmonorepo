import { QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';

import { queryClient } from '@/lib/react-query';
import { Suspense } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center w-screen h-screen">&lt; spinner &gt;</div>
      }>
      <QueryClientProvider client={queryClient}>
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
          <BrowserRouter>{children}</BrowserRouter>
        </GoogleOAuthProvider>
      </QueryClientProvider>
    </Suspense>
  );
};
