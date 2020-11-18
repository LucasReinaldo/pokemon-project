import React from 'react';
import GlobalStyle from './styles/global';

import Pokemon from './pages/Pokemon';
import Statistics from './components/Statistics';

import { Container, LeftContainer, RightContainer } from './styles/styles';

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <Container>
        <LeftContainer>
          <Statistics />
        </LeftContainer>
        <RightContainer>
          <Pokemon />
        </RightContainer>
      </Container>
    </>
  );
};

export default App;
