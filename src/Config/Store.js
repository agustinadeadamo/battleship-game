/**
 * @desc Dependencies
 */
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

/**
 * @desc Middlewares
 */
import Middlewares from './Middlewares';

/**
 * @desc Reducers
 */
import Reducers from '../Reducers/Reducer';

/**
 * @desc Store
 */
const Store = createStore(Reducers, composeWithDevTools(applyMiddleware(...Middlewares)));

export default Store;
