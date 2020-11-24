/**
 * @desc Dependencies
 */
import React from 'react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { fireEvent, within, render } from '@testing-library/react';
import TestRenderer from 'react-test-renderer';

/**
 * @desc Store
 */
import Store from '../../Config/Store';

/**
 * @desc Components
 */
import PrivateRoute from './PrivateRoute';
import StartScreen from '../../Views/StartScreen/StartScreen';
import GameScreen from '../../Views/GameScreen/GameScreen';

const { act } = TestRenderer;

describe('[PrivateRoute Component]', () => {
  let getByTestId;
  let getAllByText;
  let getByText;

  beforeEach(() => {
    const history = createMemoryHistory();
    ({ getByTestId, getAllByText, getByText } = render(
      <Router history={history}>
        <Provider store={Store}>
          <PrivateRoute path="/" component={GameScreen} />
          <StartScreen />
          <GameScreen />
        </Provider>
      </Router>,
    ));
  });

  it('Test if initial screen to be StartGameScreen', () => {
    expect(getByText(/Enter your user name./)).toBeInTheDocument();
  });

  it('Test if after having user redirects to Component send trought props', () => {
    // Gets start game button
    const startGameButton = getByTestId('start-game');
    // Gets input
    const actions = getByTestId('actions-container');
    const input = within(actions).getByTestId('input-component');
    // Fires onChange event in input and adds user name
    act(() => { fireEvent.change(input, { target: { value: 'text' } }); });
    // Fires onClick event start game button
    act(() => { fireEvent.click(startGameButton); });
    expect(getAllByText('Now play!')).toBeTruthy();
  });

  it('Test if in case user has not been added redirects to login', () => {
    // Gets start game button
    const startGameButton = getByTestId('start-game');
    // Fires onClick event start game button
    act(() => { fireEvent.click(startGameButton); });
    expect(getByText(/Enter your user name./)).toBeInTheDocument();
  });
});
