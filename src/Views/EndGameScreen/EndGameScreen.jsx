/**
 * @desc Dependencies
 */
import React from 'react';
import { useSelector } from 'react-redux';

/**
 * @desc styled components
 */
import EndGameScreen from './style';

const StartScreen = () => {
  // Store
  const winner = useSelector((state) => state.winner);

  return (
    <EndGameScreen data-testid="end-game-container">
      <div className="winner-container">
        <p className="winner">
          The winner is:
        </p>
        <p className="winner">
          {winner}
        </p>
      </div>
    </EndGameScreen>
  );
};

export default StartScreen;
