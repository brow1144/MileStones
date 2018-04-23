import React, {Component} from 'react';

import {Row, Col} from 'reactstrap';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';

import './Home.css';
import 'font-awesome/css/font-awesome.min.css'
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { fireauth } from "../base";
// import axios from 'axios';

import SideEvents from'./SideEvents';
import NavBar from './NavBar'
import AddEvent from './AddEvent';

// import {User, Project, MileStone} from '../Objects';

BigCalendar.momentLocalizer(moment);

class Home extends Component {

  constructor(props) {
    super(props);

    this.state = {
      modal: false,
      toolbar: true,

      collapse: false,
      isWideEnough: false,
      
      mileStonesCalendar: [{}],
    }
  }

  componentWillMount() {
    this.loadCalendar()
    this.handleWindowChange()
    window.addEventListener('resize', this.handleWindowChange);
  }

  componentWillUnMount() {
    window.removeEventListener('resize', this.handleWindowChange)
  }

  loadCalendar = () => {
    for (let i in this.props.user.projects) {
      let projects = this.props.user.projects[i]
      for (let j in projects.mileStones) {
        let mileStones = projects.mileStones[j]
        let event = {
          id: j, 
          title: mileStones.name,
          allDay: true,
          start: new Date('2018-04-18'),
          end: new Date('2018-04-18'),
        }
        let temp = this.state.mileStonesCalendar
        temp.push(event)
        this.setState({mileStonesCalendar: temp})

      
      }
    }
  }

  handleWindowChange = () => {
    if (window.innerWidth < 900) {
      this.setState({
        toolbar: false,
      })
    } else {
      this.setState({
        toolbar: true,
      })
    }
  };

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

  render() {

    const calendarStyles = {
      height: '40em',
    };

    const events = [
      {
        id: 14,
        title: 'ENGL 106 Essay',
        start: new Date(new Date().setHours(new Date().getHours() - 3)),
        end: new Date(new Date().setHours(new Date().getHours() + 3)),
      },
    ];

    const navProps = {
      isWideEnough: this.state.isWideEnough,
      onClick: this.onClick,
      toggle: this.toggle,
      collapse: this.state.collapse,
      handleSignOut: this.handleSignOut,
    }

    const addEventProps = {
      modal: this.state.modal,
      user: this.props.user,
      toggle: this.toggle,
    }

    return (
      <div>
          <NavBar {...navProps} />
        
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>

          <AddEvent {...addEventProps}/>

          <Row>
            <Col xs='1' md='1'/>
            <Col xs='10' md='7'> 
              <BigCalendar
                toolbar={this.state.toolbar}
                selectable
                events={this.state.mileStonesCalendar}
                style={calendarStyles}
                defaultDate={new Date()}
                eventPropGetter={(this.eventStyleGetter)}
                // onSelectEvent={event => alert(event.title)}
              />
            </Col>
            <Col xs='12' md='3'>
              <SideEvents />
            </Col>
            <Col xs='12' md='1'/>
          </Row>

          <br/>

      </div>
    );
  }
}

export default Home;
