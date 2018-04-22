import React, {Component} from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import {Navbar, NavbarBrand, Collapse, NavbarNav,
  NavItem, NavLink, NavbarToggler, ListGroup, ListGroupItem,
 Button, Modal, ModalBody, ModalHeader, ModalFooter, Input } from 'mdbreact';

import {Row, Col, Form} from 'reactstrap';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';

import './Home.css';
import 'font-awesome/css/font-awesome.min.css'
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { fireauth } from "../base";
import axios from 'axios';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import MileStoneName from './MileStoneName';

BigCalendar.momentLocalizer(moment);

class Home extends Component {

  constructor(props) {
    super(props);

    this.state = {
      collapse: false,
      isWideEnough: false,
      modal: false,
      startDate: moment(),
      milestones: [], 
    }
  }

  componentWillMount() {
    console.log(this.props.userData)
    // axios.get('http://localhost:5000/users')
    //   .then(
    //     response => console.log(response)
    //   ).catch(() => {
    //   console.log('Good catch!')
    // })
  }

  handleChange = (date) => {
    this.setState({
      startDate: date
    });
  }

  toggle = () => {
    this.setState({modal: !this.state.modal})
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

  addMilestone = (ev) => {
    ev.preventDefault();

    let currentState = this.state.milestones
    currentState.push('');
    this.setState({milestones: currentState})
  }

  updateMileStones = (data) => {
    this.setState({milestones: data})
  }

  sendMilestones = (ev) => {
    ev.preventDefault()

    //ev.target.name.value
    //ev.target.date.value
    
    for(let data in this.state.milestones) {
      console.log(this.state.milestones[data]);
    }

    console.log(this.props.uid)

    // axios.post('http://localhost:5000/users/projects', {
    //   name: target.firstName.value + " " + target.lastName.value,
    //   id: userData.uid,
    // }).then(function (response) {
    //   console.log(response);
    // }).catch(function (error) {
    //     console.log(error);
    // });

  }

  render() {
    const calendarStyles = {
      height: '30em',

    };

    const events = [
      {
        id: 14,
        title: 'ENGL 106 Essay',
        start: new Date(new Date().setHours(new Date().getHours() - 3)),
        end: new Date(new Date().setHours(new Date().getHours() + 3)),
      },
    ];

    const actions = {
      updateMileStones: this.updateMileStones,
    }

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
                  <NavItem onClick={this.toggle} style={{fontSize: '1.5em', cursor: 'pointer', color: '#2196f3'}} >
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

          <Modal backdrop={false} isOpen={this.state.modal} size='lg' toggle={this.toggle}>
          <Form onSubmit={this.sendMilestones}>
            <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
            <ModalBody>
                <Row>
                  <Col xs='12' md='1'/>
                  <Col xs='12' md='6'>
                    <Input name='name' label="Project Name"/>
                  </Col>
                  <Col style={{paddingTop: '4%'}} xs='12' md='4'> 
                    <DatePicker
                      name='date'
                      selected={this.state.startDate}
                      onChange={this.handleChange}
                    />
                  </Col>
                  <Col xs='12' md='1'/>
                </Row>

              {this.state.milestones.map((key, index) => {
                  return (
                    <MileStoneName 
                      {...actions} 
                      number={index + 1} 
                      key={index} 
                      milestones={this.state.milestones}
                    /> 
                  ) 
                })
              }
              <br/>

              <Row>
                <Col xs='12' md='10'/>
                <Col xs='12' md='1'>
                <Button onClick={this.addMilestone} color='info'>
                  <i onClick={() => {console.log('test')}} className="fas fa-plus" />
                </Button>
                </Col>
              </Row>

            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={this.toggle}>Close</Button>{' '}
              <Button type='submit' color="primary">Submit MileStones</Button>
            </ModalFooter>
            </Form>
          </Modal>

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
                    <div className="d-flex w-100 justify-content-between">
                      <h5 className="mb-1">ENGL 106 Paper</h5>
                      <small>3 days to go</small>
                    </div>
                    <p className="mb-1">Make sure to work on the third page today!</p>
                    <small>Due 4/25/18</small>
                  </ListGroupItem>
                  <ListGroupItem href="#">
                    <div className="d-flex w-100 justify-content-between">
                      <h5 className="mb-1">MA 162 Exam</h5>
                      <small className="text-muted">5 days to go</small>
                    </div>
                    <p className="mb-1">Make sure to study chapters 5-6 today!</p>
                    <small className="text-muted">Due 04/27/18</small>
                  </ListGroupItem>
                  <ListGroupItem href="#">
                    <div className="d-flex w-100 justify-content-between">
                      <h5 className="mb-1">CS 250 Lab 6</h5>
                      <small className="text-muted">6 days ago</small>
                    </div>
                    <p className="mb-1">Make sure to work on part 1 of lab 6 today!</p>
                    <small className="text-muted">Due 04/28/18</small>
                  </ListGroupItem>
                  <ListGroupItem href="#">
                    <div className="d-flex w-100 justify-content-between">
                      <h5 className="mb-1">CS 251 Project 3</h5>
                      <small className="text-muted">12 days to go</small>
                    </div>
                    <p className="mb-1">Make sure to work on part 3 of the project!</p>
                    <small className="text-muted">Due 5/01/18</small>
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
