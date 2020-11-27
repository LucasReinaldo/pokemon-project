import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import Details from './pages/Details';

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/details/:name" component={Details} />
      </Switch>
    </Router>
  );
};

export default Routes;
