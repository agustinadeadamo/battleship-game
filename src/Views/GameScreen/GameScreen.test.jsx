/**
 * @desc Dependencies
 */
import React from 'react';
import { render, fireEvent, within } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import {
  describe, expect, it, beforeEach,
} from '@jest/globals';
import { createMemoryHistory } from 'history';
import { act, create } from 'react-test-renderer';

/**
 * @desc Store
 */
import Store from '../../Config/Store';

/**
 * @desc Component
 */
import GameScreen from './GameScreen';
import StartScreen from '../StartScreen/StartScreen';

describe('[GameScreen View]', () => {
  let getByTestId;
  const history = createMemoryHistory();

  beforeEach(() => {
    ({ getByTestId } = render(
      <Router history={history}>
        <Provider store={Store}>
          <StartScreen />
          <GameScreen />
        </Provider>
      </Router>,
    ));

    // Gets start game button
    const startGameButton = getByTestId('start-game');
    // Gets input
    const actions = getByTestId('actions-container');
    const input = within(actions).getByTestId('input-component');
    // Fires onChange event in input
    act(() => { fireEvent.change(input, { target: { value: 'text' } }); });
    // Fires onClick event start game button
    act(() => { fireEvent.click(startGameButton); });
  });

  it('Matchs snapshot', () => {
    const startscreen = create(
      <Provider store={Store}>
        <GameScreen />
      </Provider>,
    );
    expect(startscreen).toMatchSnapshot();
  });

  it('Tests if the grid was shown correctly in user grid', () => {
    // Get grid container
    const gridContainer = getByTestId('grid-container-user');
    // Gets all cells
    const cells = within(gridContainer).getAllByTestId(/cell-component/);
    // Gets each ship
    const cruiser = within(gridContainer).getAllByTestId(/cruiser/);
    const submarine = within(gridContainer).getAllByTestId(/submarine/);
    const carrier = within(gridContainer).getAllByTestId(/carrier/);

    expect(cells).toHaveLength(100);
    expect(cruiser).toHaveLength(9);
    expect(submarine).toHaveLength(2);
    expect(carrier).toHaveLength(4);
    expect(gridContainer).toBeInTheDocument();
  });

  it('Tests if the grid was shown correctly in computer grid', () => {
    // Get grid container
    const gridContainer = getByTestId('grid-container-computer');
    // Gets all cells
    const cells = within(gridContainer).getAllByTestId(/cell-component/);
    // Gets each ship
    const cruiser = within(gridContainer).getAllByTestId(/cruiser/);
    const submarine = within(gridContainer).getAllByTestId(/submarine/);
    const carrier = within(gridContainer).getAllByTestId(/carrier/);

    expect(cells).toHaveLength(100);
    expect(cruiser).toHaveLength(9);
    expect(submarine).toHaveLength(2);
    expect(carrier).toHaveLength(4);
    expect(gridContainer).toBeInTheDocument();
  });

  it('Tests if when ship is hit shows pop up with right message', () => {
    // Get grid container
    const gridContainer = getByTestId('grid-container-user');
    // Get first cell o first cruiser
    const cruiser = within(gridContainer).getByTestId(/cruisers-1-1/);
    // Fire event onclick in the cell
    act(() => { fireEvent.click(cruiser); });
    // Gets popUp message
    const popUpContainer = getByTestId('popUp-container');
    const popUpMessage = within(popUpContainer).getByText('A cruisers has just been hitten');

    expect(popUpMessage).toBeInTheDocument();
  });

  it('Tests if when shot is missed shows pop up with right message', () => {
    // Get grid container
    const gridContainer = getByTestId('grid-container-user');
    // Get cell with sea content
    const sea = within(gridContainer).getAllByTestId(/sea/);
    // Fire event onclick in the cell
    act(() => {fireEvent.click(sea[0])});
    // Gets popUp message
    const popUpContainer = getByTestId('popUp-container');
    const popUpMessage = within(popUpContainer).getByText('Shot missed!');

    expect(popUpMessage).toBeInTheDocument();
  });
});
