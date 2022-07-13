import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Switch, Route } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';

import { Header } from './components/Header/Header';

import { AlertProvider } from './components/Alert/context/AlertContext';
import { DarkLightModeProvider } from './components/DarkLightMode/context/DarkLightModeContext';

import { routes } from './routes';

export const history = createBrowserHistory();

ReactDOM.render(
  <Router history={history}>
    <Switch>
      {routes.map(route => (
        <Route
          key={route.id}
          exact={route.exact}
          path={route.path}
          render={() => (
            <DarkLightModeProvider>
              <AlertProvider>
                <Header>{route.render}</Header>
              </AlertProvider>
            </DarkLightModeProvider>
          )}
        />
      ))}
    </Switch>
  </Router>,
  document.getElementById('root'),
);
