import React, {Component} from 'react';
import './App.css';

import {Route, Switch, Redirect} from 'react-router-dom';

import SignIn from './SignIn/SignIn';
import CreateUser from './CreateUser/CreateUser';


class App extends Component {
  render() {
    return (

      <Switch>

        <Route exact path='/MileStones/sign-in' render={() => (
          <SignIn/>
        )}/>

        <Route exact path='/MileStones/create-account' render={() => (
          <CreateUser/>
        )}/>

        <Route render={() => <Redirect to='/MileStones/sign-in'/>}/>

      </Switch>
    );
  }
}

export default App;
