/**
 * @desc Dependencies
 */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

/**
 * @desc Styles
 */
import PopUpComponent from './style';

const PopUp = (props) => {
  // Destructuring props
  const {
    copy,
    show,
    hidePopUp,
  } = props;

  /**
   * Hook that is executed every time show is updates
   */
  useEffect(() => {
    let timer = null;

    // Validates if show is true
    if (show) {
      // Generates timeout that will hide pop up after 3 seconds
      timer = setTimeout(() => {
        hidePopUp();
      }, 1000);
    }

    // Clears timeout
    return () => clearTimeout(timer);
  }, [show]);

  return (
    <PopUpComponent data-testid="popUp-component" className={`${show ? 'show' : 'hide'}`} show={show}>
      {copy}
    </PopUpComponent>
  );
};

PopUp.propTypes = {
  copy: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
  hidePopUp: PropTypes.func.isRequired,
};

export default PopUp;
