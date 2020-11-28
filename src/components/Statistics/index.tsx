/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Axios from 'axios';

import StatCard from '../StatCard';
import Banners from '../Banners';

import { usePokedex } from '../../context/PokedexContext';

import {
  Container,
  AbilitiesContainer,
  EvolutionContainer,
  StatsContainer,
  PropertiesContainer,
  CardContainer,
} from './styles';

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

interface RouteParams {
  name: string;
}

const Statistics: React.FC = () => {
  const [speciesData, setSpeciesData] = useState({} as Species);
  const [evolutionData, setEvolutionData] = useState({} as EvolutionChain);

  const { pokemon, getPokemon } = usePokedex();

  const { name: pokeName } = useParams() as RouteParams;

  useEffect(() => {
    const getPokemonEffect = async () => {
      getPokemon({ name: pokeName });

      const responseSpecies = await Axios.get<Species>(
        `${pokemon.species?.url}`,
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

    getPokemonEffect();
  }, [
    getPokemon,
    pokeName,
    pokemon.id,
    pokemon.species?.url,
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
            {pokemon.stats?.map(({ stat, base_stat }) => (
              <StatCard key={stat.name} stat={stat} base_stat={base_stat} />
            ))}
          </CardContainer>
        </StatsContainer>
        <AbilitiesContainer>
          <h1>Abilities</h1>
          <div>
            {pokemon.abilities?.map(({ ability }) => (
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
            {pokemon.height?.measure === 'cm' ? (
              <Banners>
                {`Height: ${pokemon.height?.converted}${pokemon.height?.measure}`}
              </Banners>
            ) : (
              <Banners>
                {`Height: ${pokemon.height?.converted}${pokemon.height?.measure}`}
              </Banners>
            )}
            <Banners>{`Weight: ${pokemon.weight}kg`}</Banners>
          </div>
        </PropertiesContainer>
      </div>
    </Container>
  );
};

export default Statistics;
