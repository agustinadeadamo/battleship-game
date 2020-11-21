/**
 * @desc Dependencies
 */
import { create } from 'react-test-renderer';
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';

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
    const onChangeValue = jest.fn();
    const {queryByTestId} = render(<Input onChangeValue={onChangeValue} value="" />);
    const inputComponent = queryByTestId('input-component');
    fireEvent.change(inputComponent, {target: {value: 'text'}});
    expect(onChangeValue).toHaveBeenCalledTimes(1);
    expect(onChangeValue).toHaveBeenCalledWith('text');
  });

  it('Shows message error', () => {
    const {queryByTestId} = render(<Input showMessageError value="" onChangeValue={() => {}} />);
    const messageErrorComponent = queryByTestId('message-error');
    expect(messageErrorComponent).toBeTruthy();
  });

  it('Does not shows message error', () => {
    const {queryByTestId} = render(<Input showMessageError={false} value="" onChangeValue={() => {}} />);
    const messageErrorComponent = queryByTestId('message-error');
    expect(messageErrorComponent).toBeFalsy();
  });

  it('Shows correct message error', () => {
    const messageError = 'You must add a user name';
    const {getByText} = render(<Input showMessageError value="" messageError={messageError} onChangeValue={() => {}} />);
    const messageErrorComponent = getByText((content) => {return (content.includes(messageError))});
    expect(messageErrorComponent).toBeInTheDocument();
  });
});