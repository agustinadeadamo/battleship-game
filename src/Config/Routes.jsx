/**
 * @desc Dependencies
 */
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

/**
 * @desc Components
 */
import PrivateRoute from '../Components/PrivateRoute/PrivateRoute';

/**
 * @desc Views
 */
import StartScreen from '../Views/StartScreen/StartScreen';

const Routes = () => {
  const [authenticated, changeAuthenticated] = useState(false);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    console.log('ENTRAAAAAAAAAAAA');
    // Validate user Exists
    if (user !== null && user !== '') {
      changeAuthenticated(true);
    }
  }, []);

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={StartScreen} />
        <PrivateRoute user={user} authenticated={authenticated} exact path="/game" component={StartScreen} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
