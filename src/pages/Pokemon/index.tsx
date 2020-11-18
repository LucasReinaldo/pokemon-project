/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import { VscArrowDown, VscArrowUp } from 'react-icons/vsc';

import { api } from '../../services/api';

import {
  Container,
  PokemonContainer,
  TypeContainer,
  HeaderContainer,
  ArrowContainer,
} from './styles';

interface Type {
  type: {
    name: string;
  };
}

interface PokemonProps {
  id: number;
  name: string;
  artwork: string;
  types: Type[];
}

const Pokemon: React.FC = () => {
  const [pokemon, setPokemon] = useState({} as PokemonProps);

  useEffect(() => {
    api.get('pokemon/zubat').then((response) => {
      const { id, name, types, sprites } = response.data;

      setPokemon({
        id,
        name,
        artwork: sprites.other['official-artwork'].front_default,
        types,
      });
    });
  }, []);

  return (
    <Container>
      <PokemonContainer>
        <HeaderContainer>
          <h1>{pokemon.name}</h1>
          <TypeContainer>
            {pokemon.types?.map(({ type }) => (
              <div key={type.name}>
                <p>{type.name}</p>
              </div>
            ))}
          </TypeContainer>
          <span>{`#${pokemon.id}`}</span>
        </HeaderContainer>
        <img src={pokemon.artwork} alt="pokemon img" />
        <ArrowContainer>
          <VscArrowDown size={24} />
          <VscArrowUp size={24} />
        </ArrowContainer>
      </PokemonContainer>
    </Container>
  );
};

export default Pokemon;
