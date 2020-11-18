import styled from 'styled-components';

export const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;

  img {
    width: 44rem;
    height: 44rem;
  }
`;

export const PokemonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  justify-content: space-between;
  margin: 3.2rem auto;
  position: relative;
`;

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  > span {
    font-size: 7.2rem;
    position: absolute;
    z-index: 1;
    opacity: 0.1;
    bottom: 4rem;
    right: 0;
    font-weight: 700;
  }

  h1 {
    text-align: center;
    text-transform: uppercase;
    color: var(--gainsboro);
    font-size: 4.8rem;
    font-weight: 800;
    letter-spacing: 3px;
  }
`;

export const ArrowContainer = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 16px;

  svg {
    width: 4rem;
    height: 4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4px;
    border-radius: 50%;
    background: var(--maximum-yellow-red);
    color: var(--text-color);
    cursor: pointer;
  }

  svg:hover {
    background: var(--poke-quaternary-color);
    transition: 0.6s ease-in-out;
  }
`;

export const TypeContainer = styled.div`
  div {
    display: inline-flex;

    p {
      text-transform: uppercase;
      font-weight: 700;
      letter-spacing: 1px;
      color: var(--poke-secondary-color);
      background-color: var(--gainsboro);
      padding: 4px;
      border-radius: 4px;
    }

    :not(:last-child):after {
      content: '';
      border: 3px solid var(--gainsboro);
      margin: auto 8px;
      border-radius: 50%;
    }
  }
`;
