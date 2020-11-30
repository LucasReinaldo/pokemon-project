import React, {
  createContext,
  SVGProps,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import { useTheme } from 'styled-components';
import PokemonTypes from '../assets/PokemonTypes';

import artworkImg from '../assets/whos-that-pokemon.png';

import { parsedHeight } from '../utils/parsedHeight';
import { parsedWeight } from '../utils/parsedWeight';

import { api } from '../services/api';

interface PokedexProps {
  count: number;
  results: {
    name: string;
    url: string;
  }[];
}

interface PokedexFilteredProps {
  name: string;
  url: string;
}

export interface PokemonName {
  [key: string]: string;
}

export interface PokemonTypesProps {
  name?: string;
  icon: SVGProps<SVGSVGElement>;
  color: string;
}

export interface Type {
  type: {
    name: keyof typeof PokemonTypes;
  };
}

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

export interface PokemonProps {
  id: number;
  height: {
    measure: string;
    converted: number;
  };
  weight: number | string;
  name: string;
  artwork: string;
  types: PokemonTypesProps[];
  stats: Stats[];
  abilities: {
    ability: {
      name: string;
    };
  }[];
  species: NameUrlProps;
}

interface PokedexContextData {
  pokedex: PokedexProps;
  pokedexList: PokedexProps;
  apiLimit: number;
  pokemon: PokemonProps;
  filteredPokemon: PokedexFilteredProps[];
  loadMore(): void;
  searchPokemon(searchName: PokemonName): void;
  getPokemon(name: PokemonName): Promise<void>;
}

const PokedexContext = createContext<PokedexContextData>(
  {} as PokedexContextData,
);

const INITIAL_LIST = 21;

const PokedexProvider: React.FC = ({ children }) => {
  const { colors } = useTheme();

  const [pokedex, setPokedex] = useState({} as PokedexProps);
  const [pokedexList, setPokedexList] = useState({} as PokedexProps);
  const [pokemon, setPokemon] = useState({} as PokemonProps);
  const [filteredPokemon, setFilteredPokemon] = useState<
    PokedexFilteredProps[]
  >([]);
  const [apiLimit, setApiLimit] = useState(INITIAL_LIST);

  const loadMore = useCallback(() => {
    setApiLimit(apiLimit + INITIAL_LIST);
  }, [apiLimit]);

  useEffect(() => {
    const getPokemonsList = async () => {
      const response = await api.get('/pokemon', {
        params: {
          limit: apiLimit,
        },
      });

      setPokedexList(response.data);
    };
    getPokemonsList();
  }, [apiLimit]);

  useEffect(() => {
    const getAllPokemons = async () => {
      const response = await api.get('/pokemon', {
        params: {
          limit: pokedex?.count,
        },
      });

      setPokedex(response.data);
    };
    getAllPokemons();
  }, [pokedex?.count]);

  const searchPokemon = useCallback(
    ({ pokemonName }: PokemonName) => {
      if (pokemonName.length >= 3) {
        const results = pokedex.results?.filter(({ name }) =>
          name.includes(pokemonName.toLocaleLowerCase()),
        );
        setFilteredPokemon(results);
      } else {
        setFilteredPokemon([]);
      }
    },
    [pokedex.results],
  );

  const getPokemon = useCallback(
    async ({ name }: PokemonName): Promise<void> => {
      api.get(`/pokemon/${name}`).then((response) => {
        const {
          id,
          name: pokename,
          types,
          height,
          weight,
          sprites,
          stats,
          abilities,
          species,
        } = response.data;

        const PokWeight = parsedWeight(weight);

        const PokHeight = parsedHeight(height);

        let setArtwork =
          sprites.other['official-artwork'].front_default ||
          sprites.front_default;

        if (setArtwork === null) {
          setArtwork = artworkImg;
        }

        const setType = types.map((pokemonType: Type) => ({
          name: pokemonType.type.name,
          icon: PokemonTypes[pokemonType.type.name],
          color: colors.type[pokemonType.type.name],
        }));

        setPokemon({
          id,
          height: PokHeight,
          weight: PokWeight,
          name: pokename,
          artwork: setArtwork,
          types: setType,
          stats,
          abilities,
          species,
        });
      });
    },
    [colors],
  );

  return (
    <PokedexContext.Provider
      value={{
        pokedex,
        pokedexList,
        apiLimit,
        pokemon,
        filteredPokemon,
        loadMore,
        getPokemon,
        searchPokemon,
      }}
    >
      {children}
    </PokedexContext.Provider>
  );
};

function usePokedex(): PokedexContextData {
  const context = useContext(PokedexContext);

  if (!context) {
    throw new Error('usePokedex must be used within an PokedexProvider.');
  }

  return context;
}

export { PokedexProvider, usePokedex };
