import React, {Component} from 'react';
import './App.css';

import {Input, Button, Card, CardImage, CardBody, CardTitle, CardText} from 'mdbreact';
import {Row, Col, Form, Label} from 'reactstrap';

import blueImage from './blueSignIn.jpg';

import {NavLink} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <section className="container">
        <div className="left-half">
          {/*<img src={blueImage} alt="Blue Blob"/>*/}
        </div>
        <div className="right-half">
          <article>
          <Form>
            <Label className="text">Please Sign In</Label>
            <Input label="Email"/>
            <Input label="Password" type="password"/>
            <br/>
            <Button color="info" block>Sign In!</Button>
          </Form>
          <hr/>
          <NavLink style={{textDecoration: 'none'}} to="/create-account">
            <Button color="info" block>Sign Up!</Button>
          </NavLink>
          </article>
        </div>
      </section>
    );
  }
}

export default App;

/*
      <div className='signIn'>
        <div className='signInImage' >
          <img src={blueImage} alt="Blue Blob"/>
        </div>
        <div className='signInForm' >
          <Form>
            <Label className="text">Please Sign In</Label>
            <Input label="Email"/>
            <Input label="Password" type="password"/>
            <br/>
            <Button color="info" block>Sign In!</Button>
          </Form>
          <hr/>
          <NavLink style={{textDecoration: 'none'}} to="/create-account">
            <Button color="info" block>Sign Up!</Button>
          </NavLink>
        </div>
      </div>
 */