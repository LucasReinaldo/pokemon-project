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
  }
`;

export const AbilitiesContainer = styled.div`
  p {
    margin-top: 8px;
    text-transform: uppercase;
    justify-content: center;
    align-items: center;
    display: inline-flex;
    font-weight: 600;
    letter-spacing: 1px;
    color: var(--gainsboro);

    :not(:last-child):after {
      content: '';
      border: 2px solid var(--gainsboro);
      margin: 8px;
      border-radius: 50%;
      background-color: none;
    }
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
    margin: 1.6rem auto;

    span {
      border: 1px solid #fff;
      margin: 0 8px;
    }

    p {
      font-weight: 500;
      font-size: 1.8rem;
    }
  }
`;
