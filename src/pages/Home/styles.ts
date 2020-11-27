import styled from 'styled-components';

export const Container = styled.div`
  flex: 1;
  display: flex;
  height: 100vh;
  padding: 24px;
  background: linear-gradient(
    -75deg,
    #46494c,
    #46494c 35%,
    #353535 35%,
    #353535
  );
`;

export const LeftContainer = styled.div`
  flex: 0.6;
  margin: 0 auto;
  width: 90%;
  color: var(--text-color-primary);
  display: flex;
  flex-direction: column;
`;

export const OverflorContainer = styled.div`
  overflow-x: scroll;
  margin: 0;
  padding: 0;
  width: 100%;

  ::-webkit-scrollbar {
    width: 0px;
    background: transparent; /* make scrollbar transparent */
  }
`;

export const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 24px;
  justify-items: center;
  width: 90%;
  margin: 32px auto;

  > div {
    flex: 1;
    width: 100%;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  > button {
    width: 20%;
    padding: 8px;
    border-radius: 8px;
    outline: none;
    border: none;
  }
`;

export const RightContainer = styled.div`
  flex: 0.4;
  width: 90%;
  margin: 0 auto;
  color: var(--text-color-primary);
  display: flex;
  justify-content: center;
  align-items: center;

  div {
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      width: auto;
      height: auto;
      max-width: 60%;
      max-height: 70%;
    }
  }
`;
