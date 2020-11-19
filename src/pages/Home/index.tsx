import React from 'react';
import { Link } from 'react-router-dom';

import { Container } from './styles';

const Home = () => {
  return (
    <Container>
      <Link to="/details">Home</Link>
    </Container>
  );
};

export default Home;
