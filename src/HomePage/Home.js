import React, {Component} from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import {Button, Navbar, NavbarBrand, Collapse, NavbarNav,
  NavItem, NavLink, Dropdown, DropdownToggle, DropdownMenu,
  DropdownItem, NavbarToggler, ListGroup, ListGroupItem} from 'mdbreact';

import {Row, Col} from 'reactstrap';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';

import Logo from '../logo.svg';

import './Home.css';
import 'font-awesome/css/font-awesome.min.css'
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { fireauth } from "../base";
import axios from 'axios';

BigCalendar.momentLocalizer(moment);

class Home extends Component {

  constructor(props) {
    super(props);

    this.state = {
      collapse: false,
      isWideEnough: false,
    }
  }

  componentWillMount() {
    // axios.get('http://localhost:8082')
    //   .then(
    //     response => console.log(response)
    //   ).catch(() => {
    //   console.log('Good catch!')
    // })
  }

  onClick = () => {
    this.setState({
      collapse: !this.state.collapse,
    });
  };

  firebaseOut = () => {
    fireauth.signOut().then(() => {
      console.log("User Signed out")
    })
  };

  eventStyleGetter = () => {
    return {
      style: {
        backgroundColor: '#2196f3',
        fontSize: '0.6em',
      }
    };
  };

  handleSignOut = () => {
    localStorage.removeItem('uid');
    this.firebaseOut();
    window.location.reload();
  };

  render() {
    const calendarStyles = {
      height: '30em',

    };

    const events = [
      {
        id: 14,
        title: 'Today',
        start: new Date(new Date().setHours(new Date().getHours() - 3)),
        end: new Date(new Date().setHours(new Date().getHours() + 3)),
      },
    ];

    return (
      <div>
        <Router>
        <Navbar color="grey lighten-5" expand="lg" fixed="top" scrolling>
          <NavbarBrand className='headerFont' style={{color: '#2196F3'}} href="#">
            MileStones
          </NavbarBrand>
          { !this.state.isWideEnough && <NavbarToggler style={{cursor: 'pointer', color: '#2196f3'}} onClick={this.onClick}><i className="fas fa-align-justify"/> </NavbarToggler>}
          <Collapse isOpen={this.state.collapse} navbar>
            <NavbarNav right>
              <NavItem style={{fontSize: '1.5em', cursor: 'pointer', color: '#2196f3'}} >
                <NavLink className="nav-link" to="/MileStones/Home">Add Event</NavLink>
              </NavItem>
              <NavItem style={{fontSize: '1.5em', cursor: 'pointer', color: '#2196f3'}}>
                <NavLink onClick={this.handleSignOut} className="nav-link" to="">Sign Out</NavLink>
              </NavItem>
            </NavbarNav>
          </Collapse>
        </Navbar>
        </Router>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <Row>
          <Col xs='1'/>
          <Col xs='7'>
            <BigCalendar
              selectable
              events={events}
              style={calendarStyles}
              defaultDate={new Date()}
              eventPropGetter={(this.eventStyleGetter)}
              onSelectEvent={event => alert(event.title)}
            />
          </Col>
          <Col xs='3'>
            <div className="sideFloat z-depth-2">
              <ListGroup>
                <ListGroupItem href="#">
                  <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1">List group item heading</h5>
                    <small>3 days ago</small>
                  </div>
                  <p class="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
                  <small>Donec id elit non mi porta.</small>
                </ListGroupItem>
                <ListGroupItem hover href="#">
                  <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1">List group item heading</h5>
                    <small class="text-muted">3 days ago</small>
                  </div>
                  <p class="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
                  <small class="text-muted">Donec id elit non mi porta.</small>
                </ListGroupItem>
                <ListGroupItem hover href="#">
                  <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1">List group item heading</h5>
                    <small class="text-muted">3 days ago</small>
                  </div>
                  <p class="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
                  <small class="text-muted">Donec id elit non mi porta.</small>
                </ListGroupItem>
                <ListGroupItem hover href="#">
                  <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1">List group item heading</h5>
                    <small class="text-muted">3 days ago</small>
                  </div>
                  <p class="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
                  <small class="text-muted">Donec id elit non mi porta.</small>
                </ListGroupItem>
              </ListGroup>
            </div>
          </Col>
          <Col xs='1'/>
        </Row>
        <br/>
        <hr/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
      </div>
    );
  }
}

export default Home;
