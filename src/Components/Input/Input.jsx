/**
 * @desc Dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';

/**
 * @desc Styles
 */
import { InputComponent, MessageError } from './style';

const Input = (props) => {
  // Destructuring props
  const {
    value,
    maxLength,
    placeholder,
    type,
    onChangeValue,
    messageError,
    showMessageError,
  } = props;

  /**
   * Function that is executed every time value in input changes
   * @param {EventTarget} event
   */
  const handleChange = (event) => {
    const valueInput = event.target.value;
    onChangeValue(valueInput);
  };

  return (
    <>
      <InputComponent
        onChange={(event) => handleChange(event)}
        value={value}
        maxLength={maxLength}
        type={type}
        placeholder={placeholder}
        data-testid="input-component"
      />
      {
        showMessageError && (
          <MessageError
            data-testid="message-error"
            className="test"
          >
            {messageError}
          </MessageError>
        )
      }
    </>
  );
};

Input.propTypes = {
  value: PropTypes.string.isRequired,
  maxLength: PropTypes.number,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  onChangeValue: PropTypes.func.isRequired,
  messageError: PropTypes.string,
  showMessageError: PropTypes.bool,
};

Input.defaultProps = {
  maxLength: 100,
  placeholder: '',
  type: 'text',
  messageError: '',
  showMessageError: false,
};

export default Input;
