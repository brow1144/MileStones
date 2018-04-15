import React, {Component} from 'react';
import './SignIn.css';

import {Input, Button} from 'mdbreact';
import {Form, Row, Col, Alert} from 'reactstrap';
import {NavLink} from 'react-router-dom';

import Logo from '../logo.svg';

import { fireauth } from "../base";

class SignIn extends Component {

  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      errorMessage: '',
    }
  }

  handleSignIn = (ev) => {
    ev.preventDefault();

    let self = this;
    fireauth.signInWithEmailAndPassword(ev.target.email.value, ev.target.password.value)
      .catch(function(err) {
        self.setState({visible: true, errorMessage: err.message})
      });
  };

  onDismiss = () => {
    this.setState({visible: false})
  };

  render() {
    return (
      <section className="container">
        <div className="left-half tall" />
        <div className="right-half tall">
          <article>
            <Row>
              <Col sm='0' md='3'>
                <img className='logo' src={Logo} alt="MileStone" />
              </Col>
              <Col xs='0' sm='1'/>
              <Col className='text' sm='12' md='7'>Welcome to MileStones!
                {/*<h3 className="text">Welcome Back!</h3>*/}
              </Col>
            </Row>
            <Alert color="primary" isOpen={this.state.visible} toggle={this.onDismiss}>
              {this.state.errorMessage}
            </Alert>
            <Form onSubmit={this.handleSignIn}>
              <Input name='email' style={{fontSize: '0.85em'}} label="Email"/>
              <Input name='password' label="Password" type="password"/>
              <br/>
              <Button className='signInButton' type='submit' color="blue" >Sign In!</Button>
              <NavLink style={{textDecoration: 'none'}} to="/MileStones/create-account">Sign Up!</NavLink>
            </Form>
          </article>
        </div>
      </section>
    );
  }
}

export default SignIn;
