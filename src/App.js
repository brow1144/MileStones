import React, {Component} from 'react';
import './App.css';

import {Input, Button, Card, CardImage, CardBody, CardTitle, CardText} from 'mdbreact';
import {Form} from 'reactstrap';

class App extends Component {
  render() {
    return (
      <section className="container">
        <div className="left-half" />
        <div className="right-half">
          <article>
            <h3 className="text">Please Sign In</h3>
            <Form>
              <Input style={{fontSize: '0.75em'}} label="Email"/>
              <Input label="Password" type="password"/>
              <br/>
              <Button color="info" >Sign In!</Button>
            </Form>
            {/*<hr/>*/}
            {/*<NavLink style={{textDecoration: 'none'}} to="/create-account">*/}
            {/*<Button color="info" >Sign Up!</Button>*/}
          {/*</NavLink>*/}
          </article>
        </div>
      </section>
    );
  }
}

export default App;
