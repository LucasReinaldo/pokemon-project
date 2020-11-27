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
`;

export const RightContainer = styled.div`
  flex: 0.5;
  width: 90%;
  margin: 0 auto;
  color: var(--text-color-primary);
`;
