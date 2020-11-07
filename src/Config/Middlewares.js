/**
 * @desc Dependencies
 */
import logger from 'redux-logger';
import thunk from 'redux-thunk';

/**
 * @desc Middlewares
 */
export default (() => {
  /**
   * @desc Indicates enviroment.
   */
  const isDevelopment = process.env.NODE_ENV === 'development';

  const Middlewares = [];

  // Middlewares of development
  if (isDevelopment) {
    // Logger of redux.
    Middlewares.push(logger);
  }

  // Adds thunk to middlewares
  Middlewares.push(thunk);

  return Middlewares;
})();
