import { createGlobalStyle } from 'styled-components';
import img from '../assets/pokeball1.svg';

export default createGlobalStyle`
  :root {
  /* UI Colors */
  --primary-color: #fff;

  --poke-primary-color: #263238;
  --poke-secondary-color: #3761a8;
  --poke-tertiary-color: #ef5350;
  --poke-quaternary-color: #fbca1c;

  --text-color: #1c1a27;
  --text-color-primary: #f7f7f7;
  --text-color-secondary: #353535;
  --text-color-secondary-light: #46494c;

  /* CSS HEX */
  --gainsboro: #dfe0e2ff;
  --rich-black-fogra-29: #0f1a20ff;
  --scarlet: #f42c04ff;
  --spanish-green: #109648ff;

  /* CSS HEX */
  --prussian-blue: #003049ff;
  --maximum-red: #d62828ff;
  --orange: #f77f00ff;
  --maximum-yellow-red: #fcbf49ff;
  --lemon-meringue: #eae2b7ff;

  /* ... */
  --border-color: #f7f9f9;
  --background-color: #d6f0f3;
  }

  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 62.5%;
    scroll-behavior: smooth;
  }

  body {
    max-height: 100vh;
    font-family: 'Roboto', sans-serif;
    text-rendering: optimizelegibility;
    -webkit-font-smoothing: antialiased;
    margin: auto;
    color: var(--text-color);
    font-size: 1.6rem;
    overflow: initial;
    width: 100vw;
    /* background-image: url(${img}) no-repeat fixed center;
    background-size: 320px; */
  }

  body, input, textarea, button {
    font: 1.6rem 'Roboto', sans-serif;
  }

  h1, h2, h3, h4, h5, h6, strong {
    font-family: 'Chakra Petch', sans-serif;
    font-weight: 600;
  }

  button, a {
    cursor: pointer;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`;
