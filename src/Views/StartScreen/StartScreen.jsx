/**
 * @desc Dependencies
 */
import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

/**
 * @desc Actions
 */
import {
  updateUserGridInReducer, updateComputerGridInReducer, updateUserName, updateGameStarted,
} from '../../Actions/Actions';

/**
 * @desc Components
 */
import Input from '../../Components/Input/Input';
import Grid from '../../Components/Grid/Grid';

/**
 * @desc Styled Components
 */
import StartScreenContainer from './style';

const StartScreen = () => {
  // State
  const [userGrid, updateUserGrid] = useState(null);
  const [computerGrid, updateComputerGrid] = useState(null);
  const [showMessageErrorUser, updateShowMessageErrorUser] = useState(false);

  // Router
  const history = useHistory();

  // Store
  const gridWidth = useSelector((state) => state.gridWidth);
  const gridHeight = useSelector((state) => state.gridHeight);
  const user = useSelector((state) => state.user);
  const ships = useSelector((state) => state.ships);
  const dispatch = useDispatch();

  // Refs
  const prevUserGridRef = useRef([]);
  const prevComputerGridRef = useRef([]);

  /**
   * Function that generates each ship in the grid
   * @param { Object } ship
   * @param { Array } grid
   *
   * @return { Array }
   */
  const generateShip = (ship, grid) => {
    // Validates that gris is an array
    if (Array.isArray(grid)) {
      // Defines direction by default
      let direction = 1;
      // Choose horizontaly or vertically direction randomly
      const randomDirection = Math.floor(Math.random() * ship.directions.length);
      // According to the random direction selected, choose the ship with the specified direciton
      const current = ship.directions[randomDirection];

      if (randomDirection === 0) {
        // This determinates the spaces between each cell according to the direction selected
        direction = 1;
      }
      if (randomDirection === 1) {
        // This determinates the spaces between each cell according to the direction selected
        direction = 10;
      }

      // Defines the las cell available according to the position selected
      const lastCellAvailable = grid.length - (ship.directions[0].length * direction);
      // Defines the random start of the ship
      const randomStart = Math.floor(Math.random() * lastCellAvailable);
      // Defines if the cell is taken
      const isTaken = current.some((index) => grid[randomStart + index].taken);
      // Defines if the random start has enough spaces on the right
      const isAtRightEdge = current.some((index) => (randomStart + index) % 10 === 10 - 1);
      // Defines if the random start has enough spaces on the right
      const isAtLeftEdge = current.some((index) => (randomStart + index) % 10 === 0);

      const modifiedInitialGrid = JSON.parse(JSON.stringify(grid));

      if (!isTaken && !isAtRightEdge && !isAtLeftEdge) {
        // Creates the ship in the grid
        current.forEach((value, index) => {
          modifiedInitialGrid[randomStart + value].taken = true;
          modifiedInitialGrid[randomStart + value].status = 'taken';
          modifiedInitialGrid[randomStart + value].cellContent = ship.spaces[index];
        });

        return modifiedInitialGrid;
      }

      // If it's taken or does not has enough spaces on the right and on the left
      // ship will be generated again
      return generateShip(ship, grid);
    }

    return [];
  };

  /**
   * Function that generates an initial and empty grid
   *
   * @return { Array }
   */
  const generateInitialGrid = () => {
    const initialGrid = [];
    // Creates grid cells with it's properties
    for (let i = 0; i < gridWidth * gridHeight; i += 1) {
      initialGrid.push({
        id: i,
        status: 'empty',
        taken: false,
        cellContent: 'sea',
      });
    }

    return initialGrid;
  };

  /**
   * Hook that is executed in first mount
   */
  useEffect(() => {
    // Generates initial grid
    const initialUserGrid = generateInitialGrid();

    // Updates userGrid and computerGrid
    updateUserGrid(initialUserGrid);
    updateComputerGrid(initialUserGrid);
  }, []);

  /**
   * Function that iterates the ship to generate each one
   * @param {*} gridForShips
   *
   * @return { Array }
   */
  const iterateShips = (gridForShips) => {
    let newGridForShips = gridForShips;
    ships.forEach((ship) => {
      newGridForShips = generateShip(ship, newGridForShips);
    });
    return newGridForShips;
  };

  /**
   * Hook that is executed on first render and every time userGrid or ships update
   */
  useEffect(() => {
    // Validates if userGrid is an array and has content, if ships is an array and has
    // content and if the prev value for userGrid was an empty array
    if ((Array.isArray(userGrid) && userGrid.length > 0
    && Array.isArray(ships) && ships.length > 0
    && prevUserGridRef.current.length === 0)) {
      // Updates prev value of userGrid
      prevUserGridRef.current = userGrid;
      // Iterates ship
      const userGridWithShips = iterateShips(userGrid);
      // Updates state
      updateUserGrid(userGridWithShips);
    }
  }, [userGrid, ships]);

  /**
   * Hook that is executed on first render and every time computerGrid and ships update
   */
  useEffect(() => {
    // Validates if computerGrid is an array and has content, if ships is an array and has
    // content and if the prev value for computerGrid was an empty array
    if ((Array.isArray(computerGrid) && computerGrid.length > 0
    && Array.isArray(ships) && ships.length > 0
    && prevComputerGridRef.current.length === 0)) {
      // Updates prev value of computerGrid
      prevComputerGridRef.current = computerGrid;
      // Iterates ship
      const computerGridWithShips = iterateShips(computerGrid);
      // Updates state
      updateComputerGrid(computerGridWithShips);
    }
  }, [computerGrid, ships]);

  /**
   * Function that is executed when "Start game" button is selected
   */
  const onClickStartGame = () => {
    let validated = true;

    // Validates if there is a user added
    if (user === '') {
      validated = false;
      updateShowMessageErrorUser(true);
    }

    // If user is added then updates store and redirects
    if (validated) {
      dispatch(updateUserName(user));
      dispatch(updateUserGridInReducer(userGrid));
      dispatch(updateComputerGridInReducer(computerGrid));
      dispatch(updateGameStarted(true));
      history.push('/game');
    }
  };

  /**
   * Function that is executed when "position ships" is clicked
   */
  const onClickChangePositions = () => {
    // Updates prev value for user Grid
    prevUserGridRef.current = [];
    // Generates initial grid
    const initialUserGrid = generateInitialGrid();
    // Updates state
    updateUserGrid(initialUserGrid);
  };

  /**
   * Function that is executed when input changes value
   */
  const onChangeUserNameInput = (value) => {
    // If value is different to an empty string it hides the error message
    if (value !== '') {
      updateShowMessageErrorUser(false);
    }

    // Updates store
    dispatch(updateUserName(value));
  };

  return (
    <StartScreenContainer>
      <div className="title">
        <h1>Battleship</h1>
        <h3>Configuration</h3>
      </div>
      <div className="instructions">
        <ul>
          <li>Enter your user name.</li>
          <li>Place you ships on the board the way you prefer.</li>
          <li>Start the game !</li>
        </ul>
      </div>
      <div className="configuration">
        <div className="first-column">
          <div data-testid="grid-container" className="grid-container">
            <Grid data-testid="grid-grid" enableGrid={false} grid={userGrid} gridName="user" />
          </div>
        </div>
        <div className="second-column" data-testid="actions-container">
          <div className="actions">
            <Input messageError="You must add a user name" showMessageError={showMessageErrorUser} data-testid="username-input" placeholder="Insert user name here" onChangeValue={(valueInput) => onChangeUserNameInput(valueInput)} value={user} />
            <div className="buttons-container">
              <button data-testid="change-positions-button" type="button" onClick={() => onClickChangePositions()}> Change position </button>
              <button className="dark" type="button" data-testid="start-game" onClick={() => onClickStartGame()}>Start Game</button>
            </div>
          </div>
        </div>
      </div>
    </StartScreenContainer>
  );
};

export default StartScreen;
