import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Banners from '../Banners';

import { PokemonName, PokemonProps } from '../../context/PokedexContext';

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

const PokemonCard = ({ name }: PokemonName) => {
  const [pokemon, setPokemon] = useState({} as PokemonProps);

  useEffect(() => {
    api.get(`/pokemon/${name}`).then((response) => {
      const { name: pokename, height, weight, sprites } = response.data;

      const PokWeight = parsedWeight(weight);
      const PokHeight = parsedHeight(height);

      setPokemon({
        ...response.data,
        artwork: sprites.other['official-artwork'].front_default,
        name: pokename,
        height: PokHeight,
        weight: PokWeight,
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
