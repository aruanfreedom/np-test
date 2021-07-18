import React from 'react';
import {
  BrowserRouter, Link, Route, Switch,
} from 'react-router-dom';

import Dashboard from './pages/dashboard';
import Orders from './pages/orders';

import Menu from './app/components/menu';
import Filters from './filters/orders';

const App = () => (
  <BrowserRouter>
    <div className="container">
      <Menu>
        <Link to="/">Orders</Link>
        <Link to="/dashboard">Dashboard</Link>
      </Menu>
      <Switch>
        <Route exact path="/">
          <Filters />
          <Orders />
        </Route>
        <Route to="/dashboard">
          <Dashboard />
        </Route>
      </Switch>
    </div>
  </BrowserRouter>
);

export default App;
