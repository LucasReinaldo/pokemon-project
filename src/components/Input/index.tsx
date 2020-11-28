import React, { useEffect, useState } from 'react';
import { usePokedex } from '../../context/PokedexContext';

import { Container } from './styles';

const Input: React.FC = () => {
  const [pokemonName, setPokemonName] = useState('');

  const { searchPokemon } = usePokedex();

  useEffect(() => {
    searchPokemon({ pokemonName });
  }, [pokemonName, searchPokemon]);

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
