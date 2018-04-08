import React, {Component} from 'react';
import './App.css';

import {Input, Button, Card, CardImage, CardBody, CardTitle, CardText} from 'mdbreact';
import {Form, FormGroup, Label} from 'reactstrap';

import {NavLink} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="text-center">
        <div className="Absolute-CenterK is-ResponsiveK">
          <Card>
            <CardBody>
              <Form>
                <Label className="text">Please Sign In</Label>
                <Input label="Email" />
                <Input label="Password" />
                <br/>
                <Button color="success" block>Sign In!</Button>
              </Form>
              <hr/>
              <NavLink style={{textDecoration: 'none'}} to="/create-account">
                <Button color="success" block>Sign Up!</Button>
              </NavLink>
              <br/>
            </CardBody>
          </Card>
        </div>
      </div>
    );
  }
}

export default App;
