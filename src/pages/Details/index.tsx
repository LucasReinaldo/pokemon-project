import React from 'react';
import { VscArrowLeft } from 'react-icons/vsc';
import { useHistory } from 'react-router-dom';

import Pokemon from '../../components/Pokemon';
import Statistics from '../../components/Statistics';

import { Container, LeftContainer, RightContainer } from './styles';

const Details: React.FC = () => {
  const history = useHistory();

  const handleGoBack = () => {
    history.goBack();
  };

  return (
    <Container>
      <LeftContainer>
        <VscArrowLeft onClick={handleGoBack} />
        <Statistics />
      </LeftContainer>
      <RightContainer>
        <Pokemon />
      </RightContainer>
    </Container>
  );
};

export default Details;
