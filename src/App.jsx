/**
 * @desc Dependencies
 */
import React from 'react';
import { Provider } from 'react-redux';

/**
 * @desc Store
 */
import Store from './Config/Store';

const App = () => (
  <Provider store={Store}>
    Battleship
  </Provider>
);

export default App;
