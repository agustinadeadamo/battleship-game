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
  updateWinner,
} from '../../Actions/Actions';

/**
 * @desc Components
 */
import PopUp from '../../Components/PopUp/PopUp';
import Grid from '../../Components/Grid/Grid';

/**
 * @desc Styled Components
 */
import GameScreenContainer from './style';

const StartScreen = () => {
  // State
  const [userGridGame, updateUserGrid] = useState(null);
  const [computerGridGame, updateComputerGrid] = useState(null);
  const [enableUserGrid, updateEnableUserGrid] = useState(true);
  const [shipsSelectedUser, updateShipsSelectedUser] = useState([]);
  const [shipsSelectedComputer, updateShipsSelectedComputer] = useState([]);
  const [copyPopUp, updateCopyPopUp] = useState('');
  const [showPopUp, updateShowPopUp] = useState(false);
  const [userTurn, updateUserTurn] = useState(true);

  // Store
  const userGrid = useSelector((state) => state.userGrid);
  const computerGrid = useSelector((state) => state.computerGrid);
  const user = useSelector((state) => state.user);
  const ships = useSelector((state) => state.ships);
  const dispatch = useDispatch();

  // Ref
  const prevComputerOnClickCell = useRef(0);
  const prevComputerOnClickTaken = useRef(false);
  const prevComputerOnClickCellValidfirst = useRef(0);
  const prevOptionSelected = useRef(0);

  // Router
  const history = useHistory();

  /**
   * Hook that is executed on first renders
   */
  useEffect(() => {
    // Updates state con store data
    updateUserGrid(userGrid);
    updateComputerGrid(computerGrid);
    updateShipsSelectedUser(ships);
    updateShipsSelectedComputer(ships);
  }, [userGrid, computerGrid]);

  /**
   * Function that is executed after one ship has been destroyed, validates
   * if all the ships from that user where destroyed
   *
   * @param { Array } shipsPlayer
   *
   * @return { Boolean }
   */
  const validateAllShipsWereDestroyed = (shipsPlayer) => {
    let allDestroyed = true;
    // Iterates ships
    shipsPlayer.forEach((ship) => {
      // If any of the ships have not been destroyed modificates the value to false
      if (ship.selected !== ship.spaces.length) {
        allDestroyed = false;
      }
    });

    return allDestroyed;
  };

  /**
   * Function that is executed after an onclick on user or computer grid is generated
   * Modifies the ships and the grid according to what has been found in cell selected
   *
   * @param { Array } gridToModifie
   * @param { Array } shipsToModifie
   * @param { Number } cellClickId
   * @param { Boolean } foundShip
   * @param { String } cellContent
   * @param { Boolean } cpuPlayer
   *
   * @return { Object }
   */
  const modifieGridAndShips = (gridToModifie, shipsToModifie,
    cellClickId, foundShip, cellContent, cpuPlayer = false) => {
    // Values by default
    let destroyed = false;
    let shipSelected = 0;
    let allDestroyed = false;

    const copyGridToModifie = gridToModifie;

    // Validates if a ship has been found on cell selected
    if (foundShip) {
      // Iterates ships
      shipsToModifie.forEach((ship, index) => {
        const copyShip = ship;
        // Iterates ships's spaces to know if it matchs with any content
        ship.spaces.forEach((space) => {
          if (cellContent === space) {
            shipSelected = index;
            // Updates how many cells have been selected in the ship
            copyShip.selected = ship.selected + 1;
            // Validates if all the ship cells have already been selected
            if (ship.selected === ship.spaces.length) {
              // If all the ship cells have already been selected changes status to destroyed
              copyGridToModifie[cellClickId].status = 'destroyed';
              destroyed = true;
              // Updates pop up copy
              updateCopyPopUp(`A ${shipsToModifie[shipSelected].name} has just been destroyed`);
              // If the player is the cpu updates if previous onClick has been taken
              if (cpuPlayer) {
                prevComputerOnClickTaken.current = false;
              }
            } else {
              // If not al the cells have been selected then updates status to hit
              copyGridToModifie[cellClickId].status = 'hit';
              // Updates pop up copy
              updateCopyPopUp(`A ${shipsToModifie[shipSelected].name} has just been hitten`);
              if (cpuPlayer) {
                prevComputerOnClickTaken.current = true;
              }
            }
          }
        });
      });
    } else {
      // If there is no ship in cell selected then status should be missed
      copyGridToModifie[cellClickId].status = 'missed';
      // Updates pop up copy
      updateCopyPopUp('Shot missed!');
    }

    // If there is a ship that was destroy, all the cells from that
    // ship in the grid should be updated
    if (destroyed) {
      // Iterates cells
      shipsToModifie[shipSelected].spaces.forEach((space) => {
        gridToModifie.forEach((cell) => {
          const cellCopy = cell;
          // If cell content matchs space modifies status
          if (cell.cellContent === space) {
            cellCopy.status = 'destroyed';
          }
        });
      });
      // Validate if all ships in grid have been destroyed
      allDestroyed = validateAllShipsWereDestroyed(shipsToModifie);
    }

    // Show pop up
    updateShowPopUp(true);

    // If not all have been destroyed retursn valua and ships and grid already modified
    return {
      allDestroyed,
      shipsToModifie,
      gridToModifie,
    };
  };

  /**
   * Function that generates click on computer grid
   *
   * @return { Number }
   */
  const generateComputerClick = () => {
    // Default value
    let randomClick = 0;
    // Options in case there is a logic that needs to be use when one click matchs with a ship
    const options = {
      1: prevComputerOnClickCell.current + 1,
      2: prevComputerOnClickCell.current - 1,
      3: prevComputerOnClickCell.current + 10,
      4: prevComputerOnClickCell.current - 10,
    };
    // If previous click was not a ship, generates randomclick
    if (prevComputerOnClickTaken.current === false) {
      randomClick = Math.floor(Math.random() * 99);
      // If previous click was a ship generates logic to sink the boat
      // Validates if all the options arround the previous valid click has been selected
    } else if (prevOptionSelected.current > Object.keys(options).length) {
      // If all the options arroun the preovious valid click has been
      // selected gets the first valid cell to continue with it's options
      prevComputerOnClickCell.current = prevComputerOnClickCellValidfirst.current;
      // Changes prevOptions to start from the first one
      prevOptionSelected.current = 0;
      // Generates click with first option
      randomClick = options[prevOptionSelected.current + 1];
    } else {
      // Generates click with the next option
      randomClick = options[prevOptionSelected.current + 1];
      // Updates prev options
      prevOptionSelected.current += 1;
    }

    return randomClick;
  };

  /**
   * Function that is executed every time one of the players wins the game
   * @param { String } player
   */
  const redirect = (player) => {
    // Updates in store the player who won
    dispatch(updateWinner(player));
    // Redirects to the end game screen
    history.push('/end');
  };

  /**
   * Function that is executed after each onclick in user grid, generates a
   * random click on computer grid and simulates a player actions
   */
  const onClickCellComputer = () => {
    const modifiedGridComputer = JSON.parse(JSON.stringify(userGridGame));
    const modifiedShipsComputer = JSON.parse(JSON.stringify(shipsSelectedUser));

    // Generates computer click
    const computerClick = generateComputerClick();

    // Validates if cell selected has not already been selected and is not undefined
    if (modifiedGridComputer[computerClick] !== undefined
      && modifiedGridComputer[computerClick].status !== 'hit'
      && modifiedGridComputer[computerClick].status !== 'destroyed'
      && modifiedGridComputer[computerClick].status !== 'missed') {
      // Validates if there is a ship in cell selected
      let foundShip = false;
      if (modifiedGridComputer[computerClick].cellContent !== 'sea') {
        // Updates prev computer click with ship in cell
        prevComputerOnClickCell.current = computerClick;
        foundShip = true;
        prevOptionSelected.current = 0;
      }

      // If prev click did not had a ship, updates with new cell
      if (!prevComputerOnClickTaken.current) {
        prevComputerOnClickCellValidfirst.current = computerClick;
        prevOptionSelected.current = 0;
      }

      // Updates grid an ships
      const gridAndShipsComputerModified = modifieGridAndShips(modifiedGridComputer,
        modifiedShipsComputer, computerClick, foundShip,
        modifiedGridComputer[computerClick].cellContent, true);
      // Destructurin the results
      const {
        allDestroyed = false,
        shipsToModifie = [],
        gridToModifie = [],
      } = gridAndShipsComputerModified;

      // If all ships were destroyed redirect to end game
      if (allDestroyed) {
        redirect('CPU');
      }

      // Updates grid
      updateShipsSelectedUser(shipsToModifie);
      updateUserGrid(gridToModifie);

      // Adds set time out to give time to pop up to hide
      setTimeout(() => {
        // Enables usergrid
        updateEnableUserGrid(true);
        // Modifies the turn, now it should show that it's user turn
        updateUserTurn(true);
      }, 1000);
    } else {
      // If the cell selected has already been selected then select a cell again
      onClickCellComputer();
    }
  };

  /**
   * Function that is executed when onClick in one of the cells of the userGrid
   * @param { Object } cell
   */
  const onClickCellUser = (cell) => {
    // Destructuring cell
    const {
      id = 0,
      status = 'empty',
      taken = false,
      cellContent = 'sea',
    } = cell;

    // Validates if cell has not been already selected before
    if (status !== 'hit' && status !== 'missed' && status !== 'destroyed') {
      // Validates if on that cell selected exists a ship
      let foundShip = false;
      if (taken) {
        foundShip = true;
      }

      const modifiedUserGrid = JSON.parse(JSON.stringify(computerGridGame));
      const modifiedUserShips = JSON.parse(JSON.stringify(shipsSelectedComputer));

      // Modifies grid and ship according to what have been found in cell
      const gridAndShipsUserModified = modifieGridAndShips(modifiedUserGrid,
        modifiedUserShips, id, foundShip, cellContent);
      // Destructuring the return value
      const {
        allDestroyed = false,
        shipsToModifie = [],
        gridToModifie = [],
      } = gridAndShipsUserModified;

      // If all ships where destroyed
      if (allDestroyed) {
        redirect(user);
      }

      // Updates grid and ship
      updateShipsSelectedComputer(shipsToModifie);
      updateComputerGrid(gridToModifie);
      // Disables user grid
      updateEnableUserGrid(false);
      // Updates the user turns, now it should show it's CPU turn
      updateUserTurn(false);

      // Generates a settimeout to generate a click on computer grid after 2 seconds
      setTimeout(() => { onClickCellComputer(); }, 2000);
    }
  };

  return (
    <GameScreenContainer>
      <div data-testid="popUp-container">
        <PopUp copy={copyPopUp} show={showPopUp} hidePopUp={() => { updateShowPopUp(false); }} />
      </div>
      <div className="title">
        <h1>BattleShip</h1>
        <h3>Now play!</h3>
      </div>
      <div className="player-turn">
        <p>
          Player:
          {userTurn ? user : 'CPU'}
        </p>
      </div>
      <div className="grids-container">
        <div className="first-column">
          <div data-testid="grid-container-computer" className="grid-container">
            <p className="grid-name">CPU</p>
            <Grid data-testid="grid-grid" enableGrid={false} grid={userGridGame} gridName="user" />
          </div>
        </div>
        <div className="second-column">
          <div data-testid="grid-container-user" className="grid-container">
            <p className="grid-name">{user}</p>
            <Grid onClickCell={(cell) => onClickCellUser(cell)} data-testid="grid-grid" enableGrid={enableUserGrid} grid={computerGridGame} gridName="computer" />
          </div>
        </div>
      </div>
      <div className="button-row">
        <div className="button-container">
          <button data-testid="surrender-button" type="button" onClick={() => redirect('CPU')}>
            Surrender
          </button>
        </div>
      </div>
    </GameScreenContainer>
  );
};

export default StartScreen;
