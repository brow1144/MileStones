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

import {ListGroup} from 'mdbreact';

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
      
      mileStonesCalendar: [],
      projectSideBar: [],

      colors: [
        '#0099CC', '#00C851', '#9933CC', '#21ce99', '#3F729B', '#ff4444', '#00695c', '#ffbb33', '#0d47a1'
      ],
    }
  }

  componentWillMount() {
    this.loadCalendar()
    this.getSideData()
    this.handleWindowChange()
    window.addEventListener('resize', this.handleWindowChange);
  }

  componentWillUnMount() {
    window.removeEventListener('resize', this.handleWindowChange)
  }

  convertDate = (date) => {
    var arr = date.split("/");
    let string = arr[2] + '-' + arr[0] + '-' + arr[1]
    return new Date(string);
  }

  loadCalendar = () => {
    for (let i in this.props.user.projects) {
      let projects = this.props.user.projects[i]
      for (let j in projects.mileStones) {
        let mileStones = projects.mileStones[j]
        let dateObject = this.convertDate(mileStones.dueDate)

        // console.log(this.state.colors[i])

        let event = {
          color: this.state.colors[i],
          id: j, 
          title: mileStones.name,
          allDay: true,
          start: dateObject,
          end: dateObject,
        }
        let temp = this.state.mileStonesCalendar
        temp.push(event)
        this.setState({mileStonesCalendar: temp})
      }
    }
  }

  daysBetween = (date1, date2) => {

    // The number of milliseconds in one day
    var ONE_DAY = 1000 * 60 * 60 * 24

    // Convert both dates to milliseconds
    var date1_ms = date1.getTime()
    var date2_ms = date2.getTime()

    // Calculate the difference in milliseconds
    var difference_ms = Math.abs(date1_ms - date2_ms)

    // Convert back to days and return
    return Math.round(difference_ms/ONE_DAY)
  }

  sameDay = (day1, day2) => {
    return day1.getFullYear() === day2.getFullYear() &&
           day1.getMonth() === day2.getMonth() &&
           day1.getDate() === day2.getDate()
  }

  getSideData = () => {
    for (let i in this.props.user.projects) {
      let projects = this.props.user.projects[i]

      let today = new Date()
      let dueDate = this.convertDate(projects.dueDate)
      let numberOfDays = this.daysBetween(today, dueDate)
      let milestoneToday = this.getMileStoneToday(projects)

      let sideData = {
        name: projects.name,
        dueDate: projects.dueDate,
        numberOfDays: numberOfDays,
        mileStoneToday: milestoneToday,
      }

      let temp = this.state.projectSideBar
      temp.push(sideData)
      this.setState({projectSideBar: temp})
    }
  }

  getMileStoneToday = (projects) => {
    for (let j in projects.mileStones) {
      let mileStones = projects.mileStones[j]
      if (this.sameDay(new Date(), this.convertDate(mileStones.dueDate))) {
        return mileStones.name
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

  handleSignOut = () => {
    localStorage.removeItem('uid');
    this.firebaseOut();
    window.location.reload();
  };

  eventStyleGetter = (event, start, end, isSelected) => {
    // console.log(`Event Color: ${event.color}`)

    return {
      style: {
        backgroundColor: event.color,
        fontSize: '0.6em',
      }
    };
  };

  render() {

    const calendarStyles = {
      height: '40em',
    };

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
            <div className="sideFloat z-depth-2">
              <ListGroup>
                {this.state.projectSideBar.map((key, index) => {
                  return (
                    <SideEvents 
                      project={key}
                      key={index} 
                    /> 
                  ) 
                })}
              </ListGroup>
            </div>
            </Col>
            <Col xs='12' md='1'/>
          </Row>

          <br/>
          <br/>
          <br/>
          <br/>


      </div>
    );
  }
}

export default Home;
