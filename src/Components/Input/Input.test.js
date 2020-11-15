/**
 * @desc Dependencies
 */
import { create } from 'react-test-renderer';
import React from 'react';
import { render, fireEvent, queryByTestId } from '@testing-library/react';

/**
 * @desc Components
 */
import Input from './Input';

describe('[Input Component]',() => {

  it('Renders correctly', () => {
    const {queryByTestId} = render(<Input onChangeValue={() => {}} value=""/>);
    expect(queryByTestId('input-component')).toBeTruthy();
  });
  
  it('Matches snapshot', () => {
    const input = create(<Input onChangeValue={() => {}} value="" />).toJSON;
    expect(input).toMatchSnapshot();
  });
  
  it('Updates value on change', () => {
    const {queryByTestId} = render(<Input onChangeValue={() => {}} />);
  
    const inputComponent = queryByTestId('input-component');
    fireEvent.change(inputComponent, {target: {value: 'text'}});
  
    expect(inputComponent.value).toBe('text');
  })

})