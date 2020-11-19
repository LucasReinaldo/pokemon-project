import React from 'react';

import { Description } from './styles';

interface IBanners {
  children: string;
}

const Banners = ({ children }: IBanners) => {
  return <Description>{children}</Description>;
};

export default Banners;
