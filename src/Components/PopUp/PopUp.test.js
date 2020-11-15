/**
 * @desc Dependencies
 */
import { create, act } from 'react-test-renderer';
import React from 'react';
import { render, screen } from '@testing-library/react';

/**
 * @desc Utils
 */

/**
 * @desc Components
 */
import PopUp from './PopUp';

const grid = [{
  id: 1,
  status: 'hit',
  taken: false,
  cellContent: 'sea',
}]

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options })


describe('[Grid Component]',() => {

  it('Renders correctly', () => {
    const {queryByTestId} = render(<PopUp copy="test" show={true} hidePopUp={() => {}}/>);
    expect(queryByTestId('popUp-component')).toBeTruthy();
  });
  
  it('Matches snapshot', () => {
    const input = create(<PopUp copy="test" show={true} hidePopUp={() => {}} />).toJSON;
    expect(input).toMatchSnapshot();
  });


  it('Hides pop up after three seconds', () => {
    // Mocks timers
    jest.useFakeTimers();
    // Renders with show value equal to true
    const {rerender} = render(<PopUp copy="test" show={true} hidePopUp={() => {}}/>);
    // Changes prop
    rerender(<PopUp copy="test" show={false} hidePopUp={() => {}} />)
    // Executes setTtimeoute
    act(() => {
      jest.runAllTimers(); // trigger setTimeout
    });
    // Validates that class has changes
    expect(screen.queryByTestId('popUp-component')).toHaveClass('hide');
  });

})
