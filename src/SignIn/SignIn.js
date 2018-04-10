import React, {Component} from 'react';
import './SignIn.css';

import {Input, Button} from 'mdbreact';
import {Form, Row, Col} from 'reactstrap';
import {NavLink} from 'react-router-dom';

import Logo from '../logo.svg';

class SignIn extends Component {
  render() {
    return (
      <section className="container">
        <div className="left-half" />
        <div className="right-half">
          <article>
            <Row>
              <Col sm='0' md='3'>
                <img className='logo' src={Logo} alt="MileStone" />
              </Col>
              <Col xs='0' sm='1'/>
              <Col sm='12' md='7'>
                <h3 className="text">Welcome Back!</h3>
              </Col>
            </Row>
            <Form>
              <Input style={{fontSize: '0.85em'}} label="Email"/>
              <Input label="Password" type="password"/>
              <br/>
              <Button className='signInButton' color="blue" >Sign In!</Button>
              <NavLink style={{textDecoration: 'none'}} to="/MileStones/create-account">Sign Up!</NavLink>
            </Form>
          </article>
        </div>
      </section>
    );
  }
}

export default SignIn;
