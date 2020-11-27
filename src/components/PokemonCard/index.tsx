import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Banners from '../Banners';

import { parsedHeight } from '../../utils/parsedHeight';
import { parsedWeight } from '../../utils/parsedWeight';

import { api } from '../../services/api';

import {
  Card,
  PokemonId,
  NameTypeContainer,
  Name,
  PokemonTypes,
} from './styles';

interface PokemonName {
  name: string;
}

interface Type {
  type: {
    name: string;
  };
}

interface PokemonProps {
  id: number;
  height: {
    measure: string;
    converted: number;
  };
  weight: number | string;
  name: string;
  artwork: string;
  types: Type[];
}

const PokemonCard = ({ name }: PokemonName) => {
  const [pokemon, setPokemon] = useState({} as PokemonProps);

  useEffect(() => {
    api.get(`/pokemon/${name}`).then((response) => {
      const {
        id,
        name: pokename,
        types,
        height,
        weight,
        sprites,
      } = response.data;

      const PokWeight = parsedWeight(weight);

      const PokHeight = parsedHeight(height);

      setPokemon({
        id,
        height: PokHeight,
        weight: PokWeight,
        name: pokename,
        artwork: sprites.other['official-artwork'].front_default,
        types,
      });
    });
  }, [name]);

  return (
    <Link to={`/details/${pokemon.name}`}>
      <Card>
        <PokemonId>
          <span>{`#${pokemon.id}`}</span>
        </PokemonId>
        <NameTypeContainer>
          <Name>{pokemon.name}</Name>
          <PokemonTypes>
            {pokemon.types?.map(({ type }) => (
              <Banners key={type.name}>{type.name}</Banners>
            ))}
          </PokemonTypes>
        </NameTypeContainer>
        <img src={pokemon.artwork} alt="pokemon img" />
      </Card>
    </Link>
  );
};

export default PokemonCard;
