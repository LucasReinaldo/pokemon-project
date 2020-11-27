import React, { useState } from 'react';

import { Container } from './styles';

const Input: React.FC = () => {
  // const find = results?.filter(({ name }) => name.includes('kyurem'));
  // console.log(find);

  const [pokemonName, setPokemonName] = useState('');

  console.log(pokemonName);

  return (
    <Container>
      <input
        value={pokemonName}
        name="Pokemon"
        placeholder="Pokemon"
        onChange={(e) => setPokemonName(e.target.value)}
      />
    </Container>
  );
};

export default Input;
