import React from 'react';
import ReactDOM from 'react-dom';

import './assets/stylesheets/bootstrap.css';
import './index.css';

import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter, Route} from 'react-router-dom';

import App from './views/App';
import SignUp from './forms/SignUp';
import SignIn from './forms/SignIn';
import NewItem from './views/NewItem';
//ADD REDUX CENTRALIZED STATE HERE
ReactDOM.render((
<BrowserRouter>
<div className="container">
  <Route exact path="/" component={App} />
  <Route path="/account/signup" component={SignUp} />
  <Route path="/account/signin" component={SignIn} />
  <Route path="/new" component={NewItem} />
</div>
</BrowserRouter>
), document.getElementById('root'));
registerServiceWorker();
