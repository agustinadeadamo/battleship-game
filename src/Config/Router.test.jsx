/**
 * @desc Dependencies
 */
import React from 'react';
import { screen, render } from '@testing-library/react';
import { Provider } from 'react-redux';

/**
 * @desc Store
*/
import Store from './Store';

/**
 * @desc Components
 */
import Routes from './Routes';

describe('[Router Component]', () => {
  it('Tests if default screen for / is okey', () => {
    render(
      <Provider store={Store}>
        <Routes />
      </Provider>,
    );
    // verify page content for expected route
    expect(screen.getByText(/Enter your user name./)).toBeInTheDocument();
  });
});
