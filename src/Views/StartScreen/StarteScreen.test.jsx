/**
 * @desc Dependencies
 */
import { create, act } from 'react-test-renderer';
import React from 'react';
import { render, fireEvent, within } from '@testing-library/react';
import { Provider } from 'react-redux';
import {
  describe, expect, it, beforeEach,
} from '@jest/globals';

/**
 * @desc Store
 */
import Store from '../../Config/Store';

/**
 * @desc Component
 */
import StartScreen from './StartScreen';

// Mocks react router history
const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

describe('[StartScreen View]', () => {
  let getByTestId;

  beforeEach(() => {
    ({ getByTestId } = render(
      <Provider store={Store}>
        <StartScreen gridName="user" />
      </Provider>,
    ));
  });

  it('Renders correctly', () => {
    expect(getByTestId('grid-component')).toBeTruthy();
  });

  it('Matchs snapshot', () => {
    const startscreen = create(
      <Provider store={Store}>
        <StartScreen gridName="user" />
      </Provider>,
    );
    expect(startscreen).toMatchSnapshot();
  });

  it('Tests if shows the cells and ships correctly after changing positons', () => {
    // Gets changePosition button
    const changePositionButton = getByTestId('change-positions-button');

    // Fires onClick event in cell item
    act(() => { fireEvent.click(changePositionButton); });

    // Gets each ships
    const gridContainer = getByTestId('grid-container');
    const cells = within(gridContainer).getAllByTestId(/cell-component/);
    const cruiser = within(gridContainer).getAllByTestId(/cruiser/);
    const submarine = within(gridContainer).getAllByTestId(/submarine/);
    const carrier = within(gridContainer).getAllByTestId(/carrier/);

    expect(cells).toHaveLength(100);
    expect(cruiser).toHaveLength(9);
    expect(submarine).toHaveLength(2);
    expect(carrier).toHaveLength(4);
  });

  it('Test if redirects once username is added and start game button is clicked', () => {
    // Gets start game button
    const startGameButton = getByTestId('start-game');
    // Gets input
    const actions = getByTestId('actions-container');
    const input = within(actions).getByTestId('input-component');

    // Fires onChange event in input
    act(() => {fireEvent.change(input, { target: { value: 'text' } }); });
    // Fires onClick event start game button
    act(() => { fireEvent.click(startGameButton)});

    expect(mockHistoryPush).toHaveBeenCalledWith('/game');
  });

  it('Test if does not redirects in case user name is not added before clicking start game button', () => {
    // Get start game button
    const cell = getByTestId('start-game');

    // Fires onClick event on start game button
    act(() => {fireEvent.click(cell)});

    // Gets cells components
    const gridContainer = getByTestId('grid-container');
    const cells = within(gridContainer).getAllByTestId(/cell-component/);

    expect(cells).toHaveLength(100);
  });

  it('Tests if error message is shown in case value is empty', () => {
    // Gets input
    const actions = getByTestId('actions-container');
    const input = within(actions).getByTestId('input-component');
    // Gets start game button
    const cell = getByTestId('start-game');

    // Fires onChange event in inout
    act(() => {fireEvent.change(input, { target: { value: '' } }); });
    // Fires onClick event on start game button
    act(() => { fireEvent.click(cell); });

    // Gets message error
    const messageError = within(actions).queryByTestId('message-error');

    expect(messageError).toBeTruthy();
  });
});
