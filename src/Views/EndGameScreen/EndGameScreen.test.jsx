/**
 * @desc Dependencies
 */
import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';

/**
 * @desc Store
 */
import Store from '../../Config/Store';

/**
 * @desc Components
 */
import EndGameScreen from './EndGameScreen';

describe('[EndGameScreen View]', () => {
  it('test it renders properly', () => {
    const { getByTestId } = render(
      <Provider store={Store}>
        <EndGameScreen />
      </Provider>,
    );

    const EndGameContainer = getByTestId('end-game-container');

    expect(EndGameContainer).toBeInTheDocument();
  });
});
