import styled from 'styled-components';

export const Description = styled.p`
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
    margin: auto 8px;
    border-radius: 50%;
    background-color: none;
  }
`;
