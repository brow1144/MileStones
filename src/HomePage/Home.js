import React, {Component} from 'react';

import {Button} from 'mdbreact';

import { fireauth } from "../base";
import axios from 'axios';

class SignIn extends Component {

  constructor(props) {
    super(props);

    this.state = {

    }
  }

  componentWillMount() {
    axios.get('http://localhost:8082')
      .then(
        response => console.log(response)
      ).catch(() => {
      console.log('Good catch!')
    })
  }

  firebaseOut = () => {
    fireauth.signOut().then(() => {
      console.log("User Signed out")
    })
  };

  handleSignOut = () => {
    localStorage.removeItem('uid');
    this.firebaseOut();
    window.location.reload();
  };

  render() {
    return (
      <div>
        <p>Hey You Signed In! Good Job!</p>
        <Button onClick={this.handleSignOut}>Sign Out</Button>
      </div>
    );
  }
}

export default SignIn;
