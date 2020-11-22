/**
 * @desc Dependencies
 */
import { create } from 'react-test-renderer';
import React from 'react';
import { render, fireEvent, within, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import TestRenderer from 'react-test-renderer';
const {act} = TestRenderer;

// Mocks react router history
const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

/**
 * @desc Store
 */
import Store from '../../Config/Store';

/**
 * @desc Component
 */
import StartScreen from './StartScreen';

describe('[StartScreen View]',() => {
  it('Renders correctly', () => {
    const {queryByTestId} = render(
    <Provider store={Store}>
      <StartScreen gridName="user" />
    </Provider>);
    expect(queryByTestId('grid-component')).toBeTruthy();
  });

  it('Matchs snapshot', () => {
    const startscreen = create(    
    <Provider store={Store}>
      <StartScreen gridName="user" />
    </Provider>);
    expect(startscreen).toMatchSnapshot();
  });

  it('Tests if shows the cells and ships correctly after changing positons', () => {
    const {getByTestId} = render(    
    <Provider store={Store}>
      <StartScreen />
    </Provider>);

    // Gets changePosition button
    const changePositionButton = getByTestId("change-positions-button");

    // Fires onClick event in cell item
    act(() => {fireEvent.click(changePositionButton)});

    // Gets each ships
    const moviesCategory = getByTestId("grid-container");
    const movies = within(moviesCategory).getAllByTestId(/cell-component/);
    const cruiser = within(moviesCategory).getAllByTestId(/cruiser/);
    const submarine = within(moviesCategory).getAllByTestId(/submarine/);
    const carrier = within(moviesCategory).getAllByTestId(/carrier/);

    expect(movies).toHaveLength(100);
    expect(cruiser).toHaveLength(9)
    expect(submarine).toHaveLength(2)
    expect(carrier).toHaveLength(4)
  });

  it('Test if redirects once username is added and start game button is clicked', () => {
    const {getByTestId} = render(    
    <MemoryRouter>  
      <Provider store={Store}>      
        <StartScreen/>
      </Provider>      
    </MemoryRouter>);

    // Gets start game button
    const startGameButton = getByTestId("start-game");
    // Gets input
    const actions = getByTestId("actions-container");
    const input = within(actions).getByTestId("input-component");

    // Fires onChange event in input
    act(() => {fireEvent.change(input, {target: {value: 'text'}})});
    // Fires onClick event start game button
    act(() => {fireEvent.click(startGameButton)});

    expect(mockHistoryPush).toHaveBeenCalledWith('/game');
  });

  it('Test if does not redirects in case user name is not added before clicking start game button', () => {
    const {getByTestId} = render(    
    <Provider store={Store}>
      <StartScreen history={[]}/>
    </Provider>);

    // Get start game button
    const cell = getByTestId("start-game");

    // Fires onClick event on start game button
    act(() => {fireEvent.click(cell)});

    // Gets cells components
    const moviesCategory = getByTestId("grid-container");
    const movies = within(moviesCategory).getAllByTestId(/cell-component/);

    expect(movies).toHaveLength(100);
  });


  it('Tests if error message is shown in case value is empty', () => {
    const {getByTestId} = render(    
    <Provider store={Store}>
      <StartScreen history={[]}/>
    </Provider>);

    // Gets input 
    const actions = getByTestId("actions-container");
    const input = within(actions).getByTestId("input-component");
    // Gets start game button
    const cell = getByTestId("start-game");

    // Fires onChange event in inout
    act(() => {fireEvent.change(input, {target: {value: ''}})});
    // Fires onClick event on start game button
    act(() => {fireEvent.click(cell)});
    
    // Gets message error
    const messageError = within(actions).queryByTestId("message-error");

    expect(messageError).toBeTruthy();
  });
})