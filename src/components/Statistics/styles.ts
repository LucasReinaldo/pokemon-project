import styled from 'styled-components';

export const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;

  > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 90%;
    width: 90%;
    justify-content: space-between;
    margin: auto;

    h1 {
      text-align: center;
      text-transform: capitalize;
    }

    img {
      width: auto;
    }
  }
`;

export const AbilitiesContainer = styled.div`
  > div {
    display: flex;
    margin-top: 8px;
  }
`;

export const EvolutionContainer = styled.div`
  > div {
    display: flex;
    margin-top: 8px;
    justify-content: center;
  }
`;

export const StatsContainer = styled.div`
  width: 100%;
  display: block;

  h1 {
    margin-bottom: 8px;
  }
`;

export const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-gap: 8px;
  justify-items: center;
`;

export const PropertiesContainer = styled.div`
  > div {
    display: flex;
    margin-top: 8px;
  }
`;
