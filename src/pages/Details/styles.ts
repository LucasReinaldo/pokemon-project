import styled from 'styled-components';

export const Container = styled.div`
  flex: 1;
  display: flex;
  height: 100vh;
  padding: 24px;
  background: linear-gradient(
    -75deg,
    #0f1a20ff,
    #0f1a20ff 50%,
    #263238 50%,
    #263238
  );
`;

export const LeftContainer = styled.div`
  flex: 0.5;
  margin: 0 auto;
  width: 90%;
  color: var(--text-color-primary);

  > svg {
    background-color: var(--poke-quaternary-color);
    color: var(--text-color);
    border-radius: 50%;
    height: 28px;
    width: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4px;
    cursor: pointer;
  }
`;

export const RightContainer = styled.div`
  flex: 0.5;
  width: 90%;
  margin: 0 auto;
  color: var(--text-color-primary);
`;
