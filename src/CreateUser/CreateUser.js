import React, {Component} from 'react';
import './CreateUser.css';

import {Input, Button} from 'mdbreact';
import {Form, Row, Col, Alert} from 'reactstrap';

import Logo from '../logo.svg';

import { fireauth } from '../base';
import axios from 'axios';

class CreateUser extends Component {

  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      message: '',
    };
  }

  onSubmit = (ev) => {
    ev.preventDefault();
    let target = ev.target;

    if ( target.firstName.value === ''
      || target.lastName.value === ''
      || target.email.value === ''
      || target.password.value === ''
      || target.confirmPassword.value === '') {

      console.log('asdf');
        this.setState({visible: true, message: 'Please fill out the entire form!'});
    } else {
      if (target.password.value !== target.confirmPassword.value)
        this.setState({visible: true, message: 'Passwords Don\'t Match!'});
      else {
        let self = this;
        fireauth.createUserWithEmailAndPassword(target.email.value, target.password.value)
          .then((userData) => {
            // console.log(userData)

            // Make addUser httpRequest
            axios.post('http://localhost:5000/users', {
              name: target.firstName.value + " " + target.lastName.value,
              id: userData.uid,
            })
            .then((response) => {
              // console.log(response);
            })
            .catch((error) => {
              console.log(error);
            });

            self.setState({visible: false, message: ''});
          }).catch((error) => {
            // Handle error
              console.log(error);
              self.setState({visible: true, message: error.message});
          });
      }
    }

  };

  onDismiss = () => {
    this.setState({ visible: false });
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
              <Col xs='0' md='1'/>
              <Col className='text' sm='12' md='7'>
                Lets Start by Signing Up!
              </Col>
            </Row>
            <br/>
            <Alert color="primary" isOpen={this.state.visible} toggle={this.onDismiss}>
              {this.state.message}
            </Alert>
            <Form onSubmit={this.onSubmit}>
              <Row>
                <Col xs='12' md='6'>
                  <Input name='firstName' className='firstName' style={{fontSize: '0.85em'}} label="First Name"/>
                </Col>
                <Col xs='12' md='6'>
                  <Input name='lastName' className='lastName' style={{fontSize: '0.85em'}} label="Last Name"/>
                </Col>
              </Row>
              <Input name='email' style={{fontSize: '0.85em'}} label="Email"/>
              <Input name='password' label="Password" type="password"/>
              <Input name='confirmPassword' label="Confirm Password" type="password"/>
              <br/>
              <Button type='submit' className='signInButton' color="blue">Sign Up!</Button>
            </Form>
          </article>
        </div>
      </section>
    );
  }
}

export default CreateUser;
