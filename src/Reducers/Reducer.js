/**
 * @desc Actions
 */
import {
  UPDATE_USER_GRID,
  UPDATE_COMPUTER_GRID,
  UPDATE_USER_NAME,
  UPDATE_GAME_STARTED,
  UPDATE_WINNER,
} from '../Actions/Actions';

/**
 * @desc Initial State
 */
const InitialState = {
  user: '',
  gameStarted: false,
  gridWidth: 10,
  gridHeight: 10,
  userGrid: [],
  computerGrid: [],
  winner: '',
  ships: [
    {
      name: 'carrier',
      spaces: ['carrier-1-1', 'carrier-1-2', 'carrier-1-3', 'carrier-1-4'],
      taken: false,
      status: 'empty',
      id: 1,
      enable: true,
      selected: 0,
      directions: [
        [0, 1, 2, 3],
        [0, 10, 10 * 2, 10 * 3],
      ],
    },
    {
      name: 'cruisers',
      spaces: ['cruisers-1-1', 'cruisers-1-2', 'cruisers-1-3'],
      taken: false,
      status: 'empty',
      id: 2,
      enable: true,
      selected: 0,
      directions: [
        [0, 1, 2],
        [0, 10, 10 * 2],
      ],
    },
    {
      name: 'cruisers',
      spaces: ['cruisers-2-1', 'cruisers-2-2', 'cruisers-2-3'],
      taken: false,
      status: 'empty',
      id: 3,
      enable: true,
      selected: 0,
      directions: [
        [0, 1, 2],
        [0, 10, 10 * 2],
      ],
    },
    {
      name: 'cruisers',
      spaces: ['cruisers-3-1', 'cruisers-3-2', 'cruisers-3-3'],
      taken: false,
      status: 'empty',
      id: 4,
      enable: true,
      selected: 0,
      directions: [
        [0, 1, 2],
        [0, 10, 10 * 2],
      ],
    },
    {
      name: 'submarine',
      spaces: ['submarine-1', 'submarine-2'],
      taken: false,
      status: 'empty',
      id: 5,
      enable: true,
      selected: 0,
      directions: [
        [0, 1],
        [0, 10],
      ],
    },
  ],
};

/**
 * @desc Reducer.
 *
 * @param { Object } state
 * @param { Object } action
 *
 * @return { Object }
 */
const Reducer = (state = InitialState, action) => {
  switch (action.type) {
    case UPDATE_USER_GRID:
      return {
        ...state,
        userGrid: action.payload,
      };

    case UPDATE_COMPUTER_GRID:
      return {
        ...state,
        computerGrid: action.payload,
      };

    case UPDATE_USER_NAME:
      return {
        ...state,
        user: action.payload,
      };

    case UPDATE_GAME_STARTED:
      return {
        ...state,
        gameStarted: action.payload,
      };

    case UPDATE_WINNER:
      return {
        ...state,
        winner: action.payload,
      };
    default:
      return state;
  }
};

export default Reducer;
