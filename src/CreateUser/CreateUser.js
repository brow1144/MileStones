import React, {Component} from 'react';
import './CreateUser.css';

import {Input, Button} from 'mdbreact';
import {Form, Row, Col} from 'reactstrap';

import Logo from '../logo.svg';

class CreateUser extends Component {
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
              <Col xs='0' md='1'/>
              <Col sm='12' md='7'>
                <h3 className="text">Lets Start by Signing Up!</h3>
              </Col>
            </Row>
            <Form>
              <Row>
                <Col xs='12' md='6'>
                  <Input classname='firstName' style={{fontSize: '0.85em'}} label="First Name"/>
                </Col>
                <Col xs='12' md='6'>
                  <Input className='lastName' style={{fontSize: '0.85em'}} label="Last Name"/>
                </Col>
              </Row>
              <Input style={{fontSize: '0.85em'}} label="Email"/>
              <Input label="Password" type="password"/>
              <Input label="Confirm Password" type="password"/>
              <br/>
              <Button className='signInButton' color="info">Sign Up!</Button>
            </Form>
          </article>
        </div>
      </section>
    );
  }
}

export default CreateUser;
