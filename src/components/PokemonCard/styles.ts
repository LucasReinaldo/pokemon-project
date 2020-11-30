import styled from 'styled-components';

interface ElementColorProps {
  color: string;
}

export const Card = styled.div<ElementColorProps>`
  display: flex;
  flex-direction: row;
  border-radius: 8px;
  width: 100%;
  height: 130px;
  padding: 4px;
  color: #000;
  background-color: ${(props) => props.color};
  position: relative;
  flex: 1 1;
  cursor: pointer;
  transition: all 0.3s ease 0s;

  img {
    position: absolute;
    margin-top: -16px;
    max-width: 140px;
    max-height: 130px;
    right: -8%;
    transition: all 0.3s ease 0s;
  }

  &:hover {
    transform: translateY(-1px);
    z-index: 1;

    img {
      max-width: 150px;
      max-height: 150px;
    }
  }
`;

export const PokemonId = styled.div`
  position: absolute;
  top: -12px;
  left: -16px;

  span {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    width: 40px;
    padding: 8px;
    background: #fff;
    border: 1px solid #fff;
    border-radius: 50%;
  }
`;

export const NameTypeContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto 0 auto 28px;
`;

export const Name = styled.h1`
  font-size: 28px;
  text-transform: uppercase;
  font-weight: 700;
  color: #fff;
`;

export const PokemonTypesName = styled.span`
  display: flex;
  flex-direction: row;
  margin: auto;
`;
