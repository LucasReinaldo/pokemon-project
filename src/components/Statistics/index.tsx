/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import Axios from 'axios';

import Cards from '../Cards';
import Banners from '../Banners';

import pokemonLogo from '../../assets/pokemon-logo.svg';
import { api } from '../../services/api';

import {
  Container,
  AbilitiesContainer,
  EvolutionContainer,
  StatsContainer,
  PropertiesContainer,
  CardContainer,
} from './styles';

interface Stats {
  base_stat: number;
  stat: {
    name: string;
  };
}

interface NameUrlProps {
  name?: string;
  url?: string;
}

interface Species {
  capture_rate: number;
  evolution_chain: {
    url: string;
  };
  evolves_from_species: NameUrlProps;
}

interface EvolutionChain {
  id: number;
  chain: {
    evolves_to: {
      species: NameUrlProps;
      evolves_to: {
        species: NameUrlProps;
      }[];
    }[];
    species: NameUrlProps;
  };
}

interface PokemonStats {
  id: number;
  height: number;
  weight: number;
  stats: Stats[];
  abilities: {
    ability: {
      name: string;
    };
  }[];
  species: NameUrlProps;
}

const Statistics: React.FC = () => {
  const [pokedex, setPokedex] = useState({} as PokemonStats);
  const [speciesData, setSpeciesData] = useState({} as Species);
  const [evolutionData, setEvolutionData] = useState({} as EvolutionChain);

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

      const responseEvolution = await Axios.get<EvolutionChain>(
        `${speciesData.evolution_chain?.url}`,
      );

      const { chain, id: chain_id } = responseEvolution.data;

      setEvolutionData({ chain, id: chain_id });
    };

    getPokemon();
  }, [pokedex.id, speciesData.evolution_chain?.url]);

  const evolutionChain = evolutionData.chain?.evolves_to.map(
    ({ evolves_to, species: specie }) => {
      const evChain = [evolutionData.chain.species, specie];
      if (evolves_to.length) {
        evolves_to?.forEach((elem) => evChain.push(elem.species));
      }
      return evChain;
    },
  );

  if (evolutionData.chain === undefined) {
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
          <h1>Evolution Chain</h1>
          <div>
            {evolutionChain[0]?.map(({ name }) => (
              <Banners key={name}>{name}</Banners>
            ))}
          </div>
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
