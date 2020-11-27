import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import { api } from '../services/api';

import { parsedHeight } from '../utils/parsedHeight';
import { parsedWeight } from '../utils/parsedWeight';

interface PokedexProps {
  count: number;
  results: {
    name: string;
    url: string;
  }[];
}

interface PokemonName {
  name: string;
}

interface Type {
  type: {
    name: string;
  };
}

interface PokemonProps {
  id: number;
  height: {
    measure: string;
    converted: number;
  };
  weight: number | string;
  name: string;
  artwork: string;
  types: Type[];
}

interface PokedexContextData {
  pokedex: PokedexProps;
  apiLimit: number;
  pokemon: PokemonProps;
  loadMore(): void;
  getPokemon(name: PokemonName): Promise<void>;
}

const PokedexContext = createContext<PokedexContextData>(
  {} as PokedexContextData,
);

const INITIAL_LIST = 21;

const PokedexProvider: React.FC = ({ children }) => {
  const [pokedex, setPokedex] = useState({} as PokedexProps);
  const [pokemon, setPokemon] = useState({} as PokemonProps);
  const [apiLimit, setApiLimit] = useState(INITIAL_LIST);

  useEffect(() => {
    const getAllPokemons = async () => {
      const response = await api.get('/pokemon', {
        params: {
          limit: pokedex.count,
        },
      });

      setPokedex(response.data);
    };
    getAllPokemons();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiLimit]);

  const loadMore = useCallback(() => {
    setApiLimit(apiLimit + INITIAL_LIST);
  }, [apiLimit]);

  const getPokemon = useCallback(async ({ name }: PokemonName): Promise<
    void
  > => {
    api.get(`/pokemon/${name}`).then((response) => {
      const {
        id,
        name: pokename,
        types,
        height,
        weight,
        sprites,
      } = response.data;

      const PokWeight = parsedWeight(weight);

      const PokHeight = parsedHeight(height);

      setPokemon({
        id,
        height: PokHeight,
        weight: PokWeight,
        name: pokename,
        artwork: sprites.other['official-artwork'].front_default,
        types,
      });
    });
  }, []);

  return (
    <PokedexContext.Provider
      value={{ pokedex, apiLimit, pokemon, loadMore, getPokemon }}
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
