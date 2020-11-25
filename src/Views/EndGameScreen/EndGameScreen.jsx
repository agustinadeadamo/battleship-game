/**
 * @desc Dependencies
 */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

/**
 * @desc styled components
 */
import EndGameScreen from './style';

/**
 * @desc Actions
 */
import {
  updateUserName,
} from '../../Actions/Actions';

const StartScreen = () => {
  // Store
  const winner = useSelector((state) => state.winner);
  const dispatch = useDispatch();

  // Router
  const history = useHistory();

  /**
   * Function that is executed when play again button is clicked
   */
  const onClickPlayAgainButton = () => {
    // Changes name in storeto empty string and redirects to initial view
    dispatch(updateUserName(''));
    history.push('/');
  };

  return (
    <EndGameScreen data-testid="end-game-container">
      <div className="winner-container">
        <p className="winner">
          The winner is:
        </p>
        <p className="winner">
          {winner}
        </p>
        <button data-testid="play-again-button" onClick={() => onClickPlayAgainButton()} type="button" className="dark button-play-again">Play again</button>
      </div>
    </EndGameScreen>
  );
};

export default StartScreen;
