/**
 * @desc Dependencies
 */
import React from 'react';
import { Provider } from 'react-redux';

/**
 * @desc Store
 */
import Store from './Config/Store';

/**
 * @desc Styled Components
 */
import GlobalStyle from './MainStyles/GlobalStyle';

const App = () => (
  <>
    <GlobalStyle />
    <Provider store={Store}>
      Battleship
    </Provider>
  </>
);

export default App;
