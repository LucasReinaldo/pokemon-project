import styled from 'styled-components';

export const Description = styled.p`
  text-transform: uppercase;
  justify-content: center;
  align-items: center;
  display: inline-flex;
  font-weight: 600;
  letter-spacing: 1px;
  color: var(--text-color-primary);

  :not(:last-child):after {
    content: '';
    border: 2px solid var(--text-color-primary);
    margin: auto 8px;
    border-radius: 50%;
    background-color: none;
  }

  > span {
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      width: 18px;
      height: 18px;
      margin-right: 4px;

      path {
        fill: #fff;
      }
    }
  }
`;
