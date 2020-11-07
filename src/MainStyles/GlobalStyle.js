/**
 * @desc Dependencies
 */
import { createGlobalStyle } from 'styled-components';

/**
 * @desc Variables
 */
import Colors from './Variables';

const GlobalStyle = createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    list-style: none;
    text-decoration: none;
    border: none;
    outline: none;
    background-color: transparent;
    box-sizing: border-box;
  }

  ol, ul {
    list-style: none;
  }

  p {
    color: ${Colors.grey}
  }
`;

export default GlobalStyle;
