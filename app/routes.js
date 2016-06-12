import React from 'react';
import {Route, IndexRoute} from 'react-router';

import Master from './master/master';
import Detail from './detail/detail';

export default (
  <Route path="/">
    <IndexRoute component={Master}/>
    <Route path="detail" component={Detail}/>
    <Route path="*" component={Master}/>
  </Route>
);