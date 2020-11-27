import React from 'react';

import { Container } from './styles';

const Filters: React.FC = () => {
  return (
    <Container>
      <label htmlFor="switch" className="switch">
        <input id="switch" type="checkbox" />
        <span className="slider" />
      </label>
    </Container>
  );
};

export default Filters;
