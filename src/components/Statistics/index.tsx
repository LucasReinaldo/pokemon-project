/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Axios from 'axios';

import StatCard from '../StatCard';
import Banners from '../Banners';

import { parsedHeight } from '../../utils/parsedHeight';
import { parsedWeight } from '../../utils/parsedWeight';

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
  height: {
    measure: number | string;
    converted: number | string;
  };
  weight: number;
  stats: Stats[];
  abilities: {
    ability: {
      name: string;
    };
  }[];
  species: NameUrlProps;
}

interface RouteParams {
  name: string;
}

const Statistics: React.FC = () => {
  const [pokedex, setPokedex] = useState({} as PokemonStats);
  const [speciesData, setSpeciesData] = useState({} as Species);
  const [evolutionData, setEvolutionData] = useState({} as EvolutionChain);

  const { name: pokeName } = useParams() as RouteParams;

  useEffect(() => {
    const getPokemon = async () => {
      const responsePokemon = await api.get(`pokemon/${pokeName}`);
      const {
        height,
        weight,
        stats,
        abilities,
        species,
        id,
      } = responsePokemon.data;

      const pokeHeight = parsedHeight(height);
      const pokeWeight = parsedWeight(weight);

      setPokedex({
        height: pokeHeight,
        weight: pokeWeight,
        stats,
        abilities,
        id,
        species,
      });

      const responseSpecies = await Axios.get<Species>(
        `${pokedex.species?.url}`,
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
  }, [
    pokeName,
    pokedex.id,
    pokedex.species?.url,
    speciesData.evolution_chain?.url,
  ]);

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
        <StatsContainer>
          <h1>Stats</h1>
          <CardContainer>
            {pokedex.stats?.map(({ stat, base_stat }) => (
              <StatCard key={stat.name} stat={stat} base_stat={base_stat} />
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
            {evolutionChain[0]?.length ? (
              evolutionChain[0]?.map(({ name }) => (
                <Banners key={name}>{name}</Banners>
              ))
            ) : (
              <p>He is the only one of his specie.</p>
            )}
          </div>
        </EvolutionContainer>
        <PropertiesContainer>
          <h1>Properties</h1>
          <div>
            {pokedex.height?.measure === 'cm' ? (
              <Banners>
                {`Height: ${pokedex.height?.converted}${pokedex.height?.measure}`}
              </Banners>
            ) : (
              <Banners>
                {`Height: ${pokedex.height?.converted}${pokedex.height?.measure}`}
              </Banners>
            )}
            <Banners>{`Weight: ${pokedex.weight}kg`}</Banners>
          </div>
        </PropertiesContainer>
      </div>
    </Container>
  );
};

export default Statistics;
