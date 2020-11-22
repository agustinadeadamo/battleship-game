/**
 * @desc Actions
 */
export const UPDATE_USER_GRID = 'UPDATE_USER_GRID';
export const UPDATE_COMPUTER_GRID = 'UPDATE_COMPUTER_GRID';
export const UPDATE_USER_NAME = 'UPDATE_USER_NAME';
export const UPDATE_GAME_STARTED = 'UPDATE_GAME_STARTED';

/**
 * @desc Updates user name
 *
 * @param { Object } payload
 *
 * @return { Object }
 */
export const updateUserName = (payload) => ({
  type: UPDATE_USER_NAME,
  payload,
});

/**
 * @desc Updates user grid
 *
 * @param { Array } payload
 *
 * @return { Object }
 */
export const updateUserGridInReducer = (payload) => ({
  type: UPDATE_USER_GRID,
  payload,
});

/**
 * @desc Updates computer grid
 *
 * @param { Array } payload
 *
 * @return { Object }
 */
export const updateComputerGridInReducer = (payload) => ({
  type: UPDATE_COMPUTER_GRID,
  payload,
});

/**
 * @desc Updates game status
 *
 * @param { Boolean } payload
 *
 * @return { Object }
 */
export const updateGameStarted = (payload) => ({
  type: UPDATE_GAME_STARTED,
  payload,
});
