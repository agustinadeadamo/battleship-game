/**
 * @desc Dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = (props) => {
  const {
    path,
    component,
  } = props;

  const user = useSelector((state) => state.user);

  return (
    user !== null ? <Route data-testid="private-route" exact path={path} component={component} /> : <Redirect to="/" />
  );
};

PrivateRoute.propTypes = {
  path: PropTypes.string.isRequired,
  component: PropTypes.func.isRequired,
};

export default PrivateRoute;
