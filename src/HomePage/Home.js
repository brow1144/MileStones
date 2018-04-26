import React, {Component} from 'react';

import {Row, Col} from 'reactstrap';

import './Home.css';
import 'font-awesome/css/font-awesome.min.css'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';

import { fireauth } from "../base";
// import axios from 'axios';

import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';

import BigCalendar from 'react-big-calendar';

import SideEvents from'./SideEvents';
import NavBar from './NavBar'
import AddEvent from './AddEvent';
import EditProject from './EditProject';

import {ListGroup} from 'mdbreact';

import 'react-big-calendar/lib/addons/dragAndDrop/styles.less';

import axios from 'axios';

// import {User, Project, MileStone} from '../Objects';

const DragAndDropCalendar = withDragAndDrop(BigCalendar);

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

      editProjectModal: false,
      editProject: {},
      editBackdrop: false,

      colors: [
        '#0099CC', '#00C851', '#673ab7', '#ffa000', '#3F729B', '#ffbb33', '#21ce99', '#00695c', '#0d47a1'
      ],
    }
  }

  componentWillMount() {
    this.loadCalendar()
    this.getSideData()
    this.handleWindowChange()
    window.addEventListener('resize', this.handleWindowChange);
  }

  updateUserHome = (data) => {
    this.props.updateUser(data)
    this.loadCalendar()
    this.getSideData()
  }

  componentWillUnMount() {
    window.removeEventListener('resize', this.handleWindowChange)
  }

  sendUpdatedProject = (project) => {
    axios.put('http://localhost:5000/users/projects/update', project).then((response) => {
      let self = this;
          axios.get(`http://localhost:5000/users/${this.props.user.id}`)
            .then((response) => {
              console.log(response);
            })
            .catch((error) => {
              console.log(error);
            });
    }).catch((error) => {
        console.log(error.message)
    });
  }

  loadCalendar = () => {
    this.setState({mileStonesCalendar: []}, () => {
      for (let i in this.props.user.projects) {
        let projects = this.props.user.projects[i]
        let index = 0;
        for (let j in projects.mileStones) {
          let mileStones = projects.mileStones[j]
          let dateObject = this.convertDate(mileStones.dueDate)
          let event
          if(projects.mileStones[j].completed) {
            event = {
              project: projects,
              color: '#9e9e9e',
              id: j, 
              title: mileStones.name,
              allDay: true,
              start: dateObject,
              end: dateObject,
            }
          }
          else if (this.datePassed(projects.mileStones[j].dueDate)) {
            event = {
              project: projects,
              color: '#b71c1c',
              id: mileStones.id, 
              title: mileStones.name,
              allDay: true,
              start: dateObject,
              end: dateObject,
            }
          }
          else {
            event = {
              project: projects,
              color: this.state.colors[i],
              id: mileStones.id, 
              title: mileStones.name,
              allDay: true,
              start: dateObject,
              end: dateObject,
            }
          }
          index = j;
          let temp = this.state.mileStonesCalendar
          temp.push(event)
          this.setState({mileStonesCalendar: temp})
        }
        let dateObject = this.convertDate(projects.dueDate)
        let event = {} 
        if (projects.completed) {
          event = {
            project: projects,
            color: '#9e9e9e',
            id: projects.id, 
            title: projects.name,
            allDay: true,
            start: dateObject,
            end: dateObject,
          }
        } else { 
          event = {
            project: projects,
            color: this.state.colors[i],
            id: projects.id, 
            title: projects.name,
            allDay: true,
            start: dateObject,
            end: dateObject,
          }
        }
        let temp = this.state.mileStonesCalendar
        temp.push(event)
        this.setState({mileStonesCalendar: temp})
      }
    })
 
  }

  moveEvent = ({event, start, end}) => {
    let mid = event.id;
    let month = start.getMonth() + 1;
    let day = start.getDate();
    let newDate = `${month}/${day}/${start.getFullYear()}`;

    for (let i in this.props.user.projects) {
      let projects = this.props.user.projects[i]
      for (let j in projects.mileStones) {
        if(projects.mileStones[j].id === mid) {
          projects.mileStones[j].dueDate = newDate;
          let newProject = {
            'user': {
                'id': this.props.user.id,
                'name': this.props.user.name
            },
            'project': {
                'name': projects.name,
                'dueDate': projects.dueDate,
                'completed': projects.completed,
                'id': projects.id, 
                'mileStones': projects.mileStones,
            }
          }

          let newUser = this.props.user;
          newUser.projects[i].mileStones[j].dueDate = newDate;
          this.props.updateUser(newUser);
          this.loadCalendar()
          this.sendUpdatedProject(newProject);
          return;
        }
      }
    }
  }

  convertDate = (date) => {
    if (date === undefined || date === null || date.length === 0) return 
    var arr = date.split("/");
    let string = arr[2] + '/' + arr[0] + '/' + arr[1]
    let newDate = new Date(string)
    return newDate
  }

  datePassed = (date) => {
    let newDate = this.convertDate(date)
    if (newDate < Date.now())
      return true
    else 
      return false 
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
    this.setState({projectSideBar: []}, () => {
      for (let i in this.props.user.projects) {
        let projects = this.props.user.projects[i]

        let today = new Date()
        let dueDate = this.convertDate(projects.dueDate)
        let numberOfDays = this.daysBetween(today, dueDate)
        let milestoneToday = this.getMileStoneToday(projects)

        let sideData = {} 
        if (projects.completed) {
          sideData = {
            name: projects.name,
            dueDate: projects.dueDate,
            numberOfDays: numberOfDays,
            mileStoneToday: milestoneToday,
            color: '#9e9e9e',
          }
        } else { 
          sideData = {
            name: projects.name,
            dueDate: projects.dueDate,
            numberOfDays: numberOfDays,
            mileStoneToday: milestoneToday,
            color: this.state.colors[i],
          }
        }

        let temp = this.state.projectSideBar
        temp.push(sideData)
        this.setState({projectSideBar: temp})
      }
      let temp = this.state.projectSideBar
      temp.sort(this.sortByDays)
      this.setState({projectSideBar: temp})
    })
  }

  sortByDays = (x, y) => {
    if (x.numberOfDays < y.numberOfDays)
      return -1;
    if (x.numberOfDays > y.numberOfDays)
      return 1;
    return 0;
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

  toggleEditProject = () => {
    this.setState({editBackdrop: false}, () => {
      this.setState({editProjectModal: !this.state.editProjectModal})
    })
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
    localStorage.removeItem('uid')
    sessionStorage.removeItem('user')
    this.firebaseOut()
    window.location.reload()
  };

  eventStyleGetter = (event, start, end, isSelected) => {
    return {
      style: {
        backgroundColor: event.color,
        fontSize: '0.6em',
      }
    };
  };

  handleEdit = (event) => {
    this.setState({editProject: event.project, editProjectModal: true, editBackdrop: true})
  }

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
      updateUser: this.props.updateUser,
      updateUserHome: this.updateUserHome,
    }
    
    const editProjectProps = {
      editProjectModal: this.state.editProjectModal,
      toggleEditProject: this.toggleEditProject,
      editProject: this.state.editProject,
      editBackdrop: this.state.editBackdrop,
      user: this.props.user,
      updateUser: this.props.updateUser,
      updateUserHome: this.updateUserHome,
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

          {this.state.editProject.mileStones === undefined 
            ?
              null
            :
              <EditProject {...editProjectProps}/>
          }

          <Row>
            <Col xs='1' md='1'/>
            <Col xs='10' md='7'> 
              <DragAndDropCalendar
                toolbar={this.state.toolbar}
                selectable
                events={this.state.mileStonesCalendar}
                onEventDrop={this.moveEvent}
                style={calendarStyles}
                defaultDate={new Date()}
                eventPropGetter={(this.eventStyleGetter)}
                onSelectEvent={(event) => {this.handleEdit(event)}}
              />
            </Col>
            <Col xs='12' md='3'>
              {this.state.projectSideBar.length < 1
              ?
                null
              :
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
              }
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

export default DragDropContext(HTML5Backend)(Home);
