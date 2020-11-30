import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { useTheme } from 'styled-components';
import Banners from '../Banners';

import { PokemonName, PokemonProps, Type } from '../../context/PokedexContext';

import PokemonTypes from '../../assets/PokemonTypes';

import artworkImg from '../../assets/whos-that-pokemon.png';

import { parsedHeight } from '../../utils/parsedHeight';
import { parsedWeight } from '../../utils/parsedWeight';

import { api } from '../../services/api';

import {
  Card,
  PokemonId,
  NameTypeContainer,
  Name,
  PokemonTypesName,
} from './styles';

const PokemonCard = ({ name }: PokemonName) => {
  const { colors } = useTheme();

  const [pokemon, setPokemon] = useState({} as PokemonProps);
  const [backgroundColor, setBackgroundColor] = useState<
    keyof typeof PokemonTypes
  >('normal');

  useEffect(() => {
    api.get(`/pokemon/${name}`).then((response) => {
      const { name: pokename, height, weight, sprites, types } = response.data;

      const PokWeight = parsedWeight(weight);
      const PokHeight = parsedHeight(height);

      let setArtwork = sprites.other['official-artwork'].front_default;

      if (setArtwork === null) {
        setArtwork = artworkImg;
      }

      const setType = types.map((pokemonType: Type) => ({
        name: pokemonType.type.name,
        icon: PokemonTypes[pokemonType.type.name],
        color: colors.type[pokemonType.type.name],
      }));

      if (types[0]?.type?.name === 'normal' && types.length > 1) {
        setBackgroundColor(types[1]?.type?.name);
      } else {
        setBackgroundColor(types[0]?.type?.name);
      }

      setPokemon({
        ...response.data,
        artwork: setArtwork,
        name: pokename,
        height: PokHeight,
        weight: PokWeight,
        types: setType,
      });
    });
  }, [colors.type, name]);

  return (
    <Link to={`/details/${pokemon.name}`}>
      <Card color={colors.backgroundType[backgroundColor]}>
        <PokemonId>
          <span>{`#${pokemon.id}`}</span>
        </PokemonId>
        <NameTypeContainer>
          <Name>{pokemon.name}</Name>
          <PokemonTypesName>
            {pokemon?.types?.map(({ name: typeName, icon }) => (
              <Banners key={typeName} icon={icon}>
                {typeName}
              </Banners>
            ))}
          </PokemonTypesName>
        </NameTypeContainer>
        <img src={pokemon.artwork} alt="pokemon img" />
      </Card>
    </Link>
  );
};

export default PokemonCard;
