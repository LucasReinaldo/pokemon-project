import React, { useMemo } from 'react';

import {
  GiArmorPunch,
  GiDefensiveWall,
  GiEggDefense,
  GiHearts,
  GiPunchBlast,
  GiSonicLightning,
} from 'react-icons/gi';

import { Card, CardHeader, CardStatsName, CardStatsBase } from './styles';

interface CardProps {
  base_stat: number;
  stat: {
    name: string;
  };
}

const StatCard = ({ stat, base_stat }: CardProps) => {
  const Icon = useMemo(() => {
    switch (stat.name) {
      case 'hp':
        return <GiHearts />;
      case 'attack':
        return <GiPunchBlast />;
      case 'defense':
        return <GiEggDefense />;
      case 'special-defense':
        return <GiDefensiveWall />;
      case 'special-attack':
        return <GiArmorPunch />;
      case 'speed':
        return <GiSonicLightning />;
      default:
        return <></>;
    }
  }, [stat.name]);

  return (
    <Card key={stat.name}>
      <CardHeader>{Icon}</CardHeader>
      <CardStatsName>
        <span>{stat.name}</span>
      </CardStatsName>
      <CardStatsBase>
        <span>{base_stat}</span>
      </CardStatsBase>
    </Card>
  );
};

export default StatCard;
