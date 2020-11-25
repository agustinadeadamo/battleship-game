/**
 * @desc Dependencies
 */
import { create, act } from 'react-test-renderer';
import React from 'react';
import { render, screen } from '@testing-library/react';
import {
  describe, expect, it, jest,
} from '@jest/globals';

/**
 * @desc Components
 */
import PopUp from './PopUp';

describe('[PopUp Component]', () => {
  it('Renders correctly', () => {
    const { queryByTestId } = render(<PopUp show copy="test" hidePopUp={() => {}} />);
    expect(queryByTestId('popUp-component')).toBeTruthy();
  });

  it('Matches snapshot', () => {
    const input = create(<PopUp show copy="test" hidePopUp={() => {}} />).toJSON;
    expect(input).toMatchSnapshot();
  });

  it('Hides pop up after three seconds', () => {
    // Mocks timers
    jest.useFakeTimers();
    // Renders with show value equal to true
    const { rerender } = render(<PopUp show copy="test" hidePopUp={() => {}} />);
    // Changes prop
    rerender(<PopUp copy="test" show={false} hidePopUp={() => {}} />);
    // Executes setTtimeoute
    act(() => {
      jest.runAllTimers(); // trigger setTimeout
    });
    // Validates that class has changes
    expect(screen.queryByTestId('popUp-component')).toHaveClass('hide');
  });
});
