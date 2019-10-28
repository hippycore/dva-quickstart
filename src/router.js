import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from './routes/IndexPage';

import Layout from '../src/layout';
function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Layout>
        <Route path="/" exact component={IndexPage} />
        </Layout>
      </Switch>
    </Router>
  );
}

export default RouterConfig;
