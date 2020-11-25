/**
 * @desc Dependencies
 */
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { act, create } from 'react-test-renderer';
import {
  describe, expect, it, beforeEach,
} from '@jest/globals';

/**
 * @desc Store
 */
import Store from '../../Config/Store';

/**
 * @desc Components
 */
import EndGameScreen from './EndGameScreen';

// Mocks react router history
const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

describe('[EndGameScreen View]', () => {
  let getByTestId;

  beforeEach(() => {
    ({ getByTestId } = render(
      <Provider store={Store}>
        <EndGameScreen />
      </Provider>,
    ));
  });

  it('test if renders properly', () => {
    // Gets endGame container
    const EndGameContainer = getByTestId('end-game-container');
    expect(EndGameContainer).toBeInTheDocument();
  });

  it('Matchs snapshot', () => {
    const startscreen = create(
      <Provider store={Store}>
        <EndGameScreen />
      </Provider>,
    );
    expect(startscreen).toMatchSnapshot();
  });

  it('test if onClick play again button generates redirects', () => {
    // Gets play again button
    const playAgainButton = getByTestId('play-again-button');
    // Fires onClick event to play again
    act(() => { fireEvent.click(playAgainButton); });
    expect(mockHistoryPush).toHaveBeenCalledWith('/');
  });
});
