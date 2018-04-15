import React, {Component} from 'react';
import './App.css';

import {Route, Switch, Redirect} from 'react-router-dom';

import 'font-awesome/css/font-awesome.min.css';

import SignIn from './SignIn/SignIn';
import CreateUser from './CreateUser/CreateUser';
import Home from './HomePage/Home';

import firebase from './base';

class App extends Component {

  constructor() {
    super();

    this.state = {
      uid: null,
    }
  }

  componentWillMount() {
    this.getUserFromLocalStorage();
    let self = this;
    firebase.auth().onAuthStateChanged(
      (user) => {
        if (user) {
          // finished signing in
          self.authHandler(user)
        } else {
          // finished signing out
          self.setState({uid: null}, () => {
            // window.location.reload();
          });
        }
      }
    )
  }

  getUserFromLocalStorage() {
    const uid = localStorage.getItem('uid');
    if (!uid) return;
    this.setState({uid})
  }

  authHandler = (user) => {
    localStorage.setItem('uid', user.uid);
    this.setState({uid: user.uid})
  };

  signedIn = () => {
    return this.state.uid
  };



  render() {
    return (

      <Switch>

        <Route exact path='/MileStones/Home' render={() => (
          this.signedIn()
            ? <Home/>
            : <Redirect to="/MileStones/sign-in"/>
        )}/>

        <Route exact path='/MileStones/sign-in' render={() => (
          !this.signedIn()
            ? <SignIn/>
            : <Redirect to="/MileStones/Home"/>
        )}/>

        <Route exact path='/MileStones/create-account' render={() => (
          !this.signedIn()
            ? <CreateUser/>
            : <Redirect to="/MileStones/Home"/>
        )}/>

        <Route render={() => <Redirect to='/MileStones/Home'/>}/>

      </Switch>
    );
  }
}

export default App;
