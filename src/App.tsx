import React from 'react';
import { ThemeProvider } from 'styled-components';
import theme from './styles/theme/theme';
import GlobalStyle from './styles/global';

import Routes from './routes';
import Providers from './context/Providers';

const App: React.FC = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Providers>
          <Routes />
        </Providers>
      </ThemeProvider>
    </>
  );
};

export default App;
