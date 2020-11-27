import React from 'react';
import GlobalStyle from './styles/global';

import Routes from './routes';
import Providers from './context/Providers';

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <Providers>
        <Routes />
      </Providers>
    </>
  );
};

export default App;
