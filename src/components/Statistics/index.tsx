/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';

import Cards from '../Cards';

import { api } from '../../services/api';

import {
  Container,
  AbilitiesContainer,
  StatsContainer,
  PropertiesContainer,
  CardContainer,
} from './styles';

interface Ability {
  ability: {
    name: string;
  };
}

interface Stats {
  base_stat: number;
  stat: {
    name: string;
  };
}

interface PokemonStats {
  height: number;
  weight: number;
  stats: Stats[];
  abilities: Ability[];
}

const Statistics: React.FC = () => {
  const [pokedex, setPokedex] = useState({} as PokemonStats);

  useEffect(() => {
    api.get('pokemon/zubat').then((response) => {
      const { height, weight, stats, abilities } = response.data;

      setPokedex({
        height,
        weight,
        stats,
        abilities,
      });
    });
  }, []);

  return (
    <Container>
      <div>
        <h1>Pokémon</h1>
        <StatsContainer>
          <h1>Stats</h1>
          <CardContainer>
            {pokedex.stats?.map(({ stat, base_stat }) => (
              <Cards key={stat.name} stat={stat} base_stat={base_stat} />
            ))}
          </CardContainer>
        </StatsContainer>
        <AbilitiesContainer>
          <h1>Abilities</h1>
          {pokedex.abilities?.map(({ ability }) => (
            <p key={ability.name}>{ability.name}</p>
          ))}
        </AbilitiesContainer>
        <PropertiesContainer>
          <h1>Properties</h1>
          <div>
            <p>
              {`Height: 
              ${pokedex.height}`}
            </p>
            <span />
            <p>
              {`Weight: 
              ${pokedex.weight}`}
            </p>
          </div>
        </PropertiesContainer>
      </div>
    </Container>
  );
};

export default Statistics;
