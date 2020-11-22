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
    color: ${Colors.grey};
  }

  ol, ul {
    list-style: none;
  }

  p {
    color: ${Colors.grey}
  }

  button {
    border: 2px solid ${Colors.grey};
    border-radius: 5px;
    padding: 10px;
    margin: 10px 0;
    width: 100%;
    text-transform: uppercase;

    &.dark {
      background-color: ${Colors.grey};
      color: ${Colors.white}
    }
  }
`;

export default GlobalStyle;
