/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';

import Axios from 'axios';
import Cards from '../Cards';

import pokemonLogo from '../../assets/pokemon-logo.svg';
import { api } from '../../services/api';

import {
  Container,
  AbilitiesContainer,
  EvolutionContainer,
  EvolvesFrom,
  EvolvesTo,
  StatsContainer,
  PropertiesContainer,
  CardContainer,
} from './styles';
import Banners from '../Banners';

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

interface NameUrlProps {
  name?: string | null;
  url?: string | null;
}

interface Species {
  capture_rate: number;
  evolution_chain: {
    url: string;
  };
  evolves_from_species: NameUrlProps;
}

interface Evolution {
  evolves_to: {
    species: NameUrlProps;
    evolves_to: {
      species: NameUrlProps;
    }[];
  }[];
}

interface PokemonStats {
  id: number;
  height: number;
  weight: number;
  stats: Stats[];
  abilities: Ability[];
  species: NameUrlProps;
}

const Statistics: React.FC = () => {
  const [pokedex, setPokedex] = useState({} as PokemonStats);
  const [speciesData, setSpeciesData] = useState({} as Species);
  const [evolutionData, setEvolutionData] = useState({} as Evolution);

  useEffect(() => {
    const getPokemon = async () => {
      const responsePokemon = await api.get('pokemon/vileplume');
      const {
        height,
        weight,
        stats,
        abilities,
        species,
        id,
      } = responsePokemon.data;

      setPokedex({
        height,
        weight,
        stats,
        abilities,
        id,
        species,
      });

      const responseSpecies = await api.get<Species>(
        `pokemon-species/${pokedex.id}`,
      );

      const {
        capture_rate,
        evolution_chain,
        evolves_from_species,
      } = responseSpecies.data;

      setSpeciesData({ capture_rate, evolution_chain, evolves_from_species });

      const responseEvolution = await Axios.get(
        `${speciesData.evolution_chain?.url}`,
      );

      const { chain } = responseEvolution.data;
      console.log(chain);

      setEvolutionData(chain);
    };

    getPokemon();
  }, [pokedex.id, speciesData.evolution_chain?.url]);

  const evolutionChain = evolutionData.evolves_to?.map(
    ({ species: elem, evolves_to }) => {
      const evChain = [elem];
      if (evolves_to.length) {
        evolves_to?.forEach(({ species }) => evChain.push(species));
      }

      return evChain;
    },
  );

  console.log(evolutionChain);

  if (evolutionData.evolves_to === undefined) {
    return <p>Loading...</p>;
  }

  return (
    <Container>
      <div>
        <img src={pokemonLogo} alt="pokemon logo" />
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
          <div>
            {pokedex.abilities?.map(({ ability }) => (
              <Banners key={ability.name}>{ability.name}</Banners>
            ))}
          </div>
        </AbilitiesContainer>
        <EvolutionContainer>
          <EvolvesFrom>
            <h2>Evolves from</h2>
            {speciesData.evolves_from_species !== null ? (
              <p>{speciesData.evolves_from_species?.name}</p>
            ) : (
              <p>First of his specie!</p>
            )}
          </EvolvesFrom>
          <EvolvesTo>
            <h2>Evolves To</h2>
            {evolutionData.evolves_to &&
            evolutionData?.evolves_to[0]?.species !== null ? (
              <p>{evolutionData?.evolves_to[0]?.species.name}</p>
            ) : (
              <span>-</span>
            )}
          </EvolvesTo>
        </EvolutionContainer>
        <PropertiesContainer>
          <h1>Properties</h1>
          <div>
            <Banners>
              {`Height: 
              ${pokedex.height}`}
            </Banners>
            <Banners>
              {`Weight: 
              ${pokedex.weight}`}
            </Banners>
          </div>
        </PropertiesContainer>
      </div>
    </Container>
  );
};

export default Statistics;
