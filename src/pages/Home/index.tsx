/* eslint-disable no-console */
import React from 'react';

import imgHome from '../../assets/ash.png';
import Input from '../../components/Input';
import PokemonCard from '../../components/PokemonCard';
import Filters from '../../components/Filters';

import pokemonLogo from '../../assets/pokemon-logo.svg';

import { usePokedex } from '../../context/PokedexContext';

import {
  Container,
  LeftContainer,
  OverflorContainer,
  CardContainer,
  ButtonContainer,
  RightContainer,
} from './styles';

const Home = () => {
  const { pokedex, loadMore, apiLimit } = usePokedex();

  return (
    <Container>
      <LeftContainer>
        <img src={pokemonLogo} alt="pokemon logo" />
        <Input />
        <Filters />
        <OverflorContainer>
          <CardContainer>
            {pokedex.results?.slice(0, apiLimit).map(({ name }) => (
              <div key={name}>
                <PokemonCard name={name} />
              </div>
            ))}
          </CardContainer>
        </OverflorContainer>
        <ButtonContainer>
          <button onClick={loadMore} type="button">
            See more!
          </button>
        </ButtonContainer>
      </LeftContainer>
      <RightContainer>
        <div>
          <img src={imgHome} alt="Home" />
        </div>
      </RightContainer>
    </Container>
  );
};

export default Home;
