import React from 'react';
import { PokedexProvider } from './PokedexContext';

const Providers: React.FC = ({ children }) => {
  return <PokedexProvider>{children}</PokedexProvider>;
};

export default Providers;
