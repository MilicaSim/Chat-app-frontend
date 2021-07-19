import ReactDOM from 'react-dom';
import React from 'react';
import './index.css';
import SignUp from './components/SignUp/SignUp'
import Dashboard from './components/Dashboard/Dashboard'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import Login from './components/Login/Login';
import MyAccount from './components/MyAccount/MyAccount';


const Routing = () => {
  return(
    <Router>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/SignUp" component={ SignUp } />
        <Route path="/Dashboard" component={ Dashboard } />
        <Route path="/my-account" component={ MyAccount } />
      </Switch>
    </Router>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <Routing />
  </React.StrictMode>,
  document.getElementById('root')
);

