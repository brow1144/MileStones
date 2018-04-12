import React, {Component} from 'react';

import {Input, Button} from 'mdbreact';

import { fireauth } from "../base";

class SignIn extends Component {

  constructor(props) {
    super(props);

    this.state = {

    }
  }

  firebaseOut = () => {
    fireauth.signOut().then(() => {
      console.log("User Signed out")
    })
  };

  handleSignOut = () => {
    localStorage.removeItem('uid');
    // this.setState({uid: null});
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
