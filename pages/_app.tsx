import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { NextPage } from 'next';
import { ReactNode, useEffect } from 'react';
import { UserContextProvider } from '@store';
import { ErrorCatcher } from '@core';
import '../src/style.scss';
import 'react-datepicker/dist/react-datepicker.css';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactNode) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <AppWithStore>{getLayout(<Component {...pageProps} />)} </AppWithStore>
  );
}

function AppWithStore({ children }) {
  return (
    <ErrorCatcher>
      <UserContextProvider>{children}</UserContextProvider>
    </ErrorCatcher>
  );
}
export default MyApp;
