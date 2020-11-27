import styled from 'styled-components';

export const Card = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  border-radius: 8px;
  background: tomato;
  width: 100%;
  height: 72px;
  padding: 4px;
`;

export const CardHeader = styled.div`
  svg {
    width: 3.2rem;
    height: 3.2rem;
  }
`;

export const CardStatsName = styled.div`
  flex: 0.8;
  display: flex;
  margin: auto 4px;

  span {
    text-transform: uppercase;
    font-weight: 600;
    letter-spacing: 1px;
    color: --primary-color;
    font-size: 1.8rem;
  }
`;

export const CardStatsBase = styled.div`
  flex: 0.2;
  display: flex;
  margin: auto 4px;

  span {
    margin: 0 auto;
    text-transform: uppercase;
    font-weight: 600;
    letter-spacing: 1px;
    color: --primary-color;
    font-size: 4rem;
  }
`;
