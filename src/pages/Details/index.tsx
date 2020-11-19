import React from 'react';

import Pokemon from '../../components/Pokemon';
import Statistics from '../../components/Statistics';

import { Container, LeftContainer, RightContainer } from './styles';

const Details: React.FC = () => {
  return (
    <Container>
      <LeftContainer>
        <Statistics />
      </LeftContainer>
      <RightContainer>
        <Pokemon />
      </RightContainer>
    </Container>
  );
};

export default Details;
