import React, { SVGProps } from 'react';

import { Description } from './styles';

interface IBanners {
  children: string | null | undefined;
  icon?: SVGProps<SVGSVGElement>;
}

const Banners = ({ children, icon }: IBanners) => {
  return (
    <Description>
      {icon && <span>{icon}</span>}
      {children}
    </Description>
  );
};

export default Banners;
