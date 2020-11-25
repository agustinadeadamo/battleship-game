/**
 * @desc Dependencies
 */
import logger from 'redux-logger';

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

  return Middlewares;
})();
