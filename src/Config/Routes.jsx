/**
 * @desc Dependencies
 */
import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

/**
 * @desc Components
 */
import PrivateRoute from '../Components/PrivateRoute/PrivateRoute';

/**
 * @desc Views
 */
import StartScreen from '../Views/StartScreen/StartScreen';
import GameScreen from '../Views/GameScreen/GameScreen';
import EndGameScreen from '../Views/EndGameScreen/EndGameScreen';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={StartScreen} />
      <PrivateRoute exact path="/game" component={GameScreen} />
      <PrivateRoute exact path="/end" component={EndGameScreen} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
