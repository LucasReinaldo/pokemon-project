/* eslint-disable camelcase */
import React, { useEffect } from 'react';
import { VscArrowDown, VscArrowUp } from 'react-icons/vsc';
import { useParams } from 'react-router-dom';
import { usePokedex } from '../../context/PokedexContext';

import Banners from '../Banners';

import {
  Container,
  PokemonContainer,
  TypeContainer,
  HeaderContainer,
  ArrowContainer,
} from './styles';

interface RouteParams {
  name: string;
}

const Pokemon: React.FC = () => {
  const { pokemon, getPokemon } = usePokedex();

  const { name } = useParams() as RouteParams;

  useEffect(() => {
    getPokemon({ name });
  }, [getPokemon, name]);

  return (
    <Container>
      <PokemonContainer>
        <HeaderContainer>
          <h1>{pokemon.name}</h1>
          <TypeContainer>
            <div>
              {pokemon?.types?.map(({ name: typeName, icon }) => (
                <Banners key={typeName} icon={icon}>
                  {typeName}
                </Banners>
              ))}
            </div>
          </TypeContainer>
          <span>{`#${pokemon.id}`}</span>
        </HeaderContainer>
        <img src={pokemon.artwork} alt="pokemon img" />
        <ArrowContainer />
      </PokemonContainer>
    </Container>
  );
};

export default Pokemon;
