import React, { Component } from 'react';
import './App.css';

import { Input, Button } from 'mdbreact';
import { Row, Col } from 'reactstrap';

class App extends Component {
  render() {
    return (
      <div>
        <Row>
          <Col xs='0' md='2'/>
          <Col xs='12' md='8'>
            <h2 className="mb-5">Form login</h2>
            <form>
              <p className="h5 text-center mb-4">Sign in</p>
              <Input label="Type your email" icon="envelope" group type="email" validate error="wrong" success="right"/>
              <Input label="Type your password" icon="lock" group type="password" validate/>
              <div className="text-center">
                <Button>Login</Button>
              </div>
            </form>
          </Col>
          <Col xs='0' md='2'/>
        </Row>
      </div>
    );
  }
}

export default App;
