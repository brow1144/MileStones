import React, {Component} from 'react';

import moment from 'moment';
import axios from 'axios';

import {Button, Modal, ModalBody, ModalHeader, ModalFooter, Input } from 'mdbreact';
import {Row, Col, Form, Alert} from 'reactstrap';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import MileStoneName from './MileStoneName';

class AddEvent extends Component {

  constructor(props) {
    super(props)
    
    this.state = {
      startDate: moment(),
      milestoneTitle: '',
      milestones: [''], 
      visible: false,
      errorMessage: '',
    }
  }

  handleChange = (date) => {
    this.setState({startDate: date});
  }

  addMilestone = (ev) => {
    ev.preventDefault();

    let currentState = this.state.milestones
    currentState.push('');
    this.setState({milestones: currentState})
  }

  handleClose = (ev) => {
    ev.preventDefault()

    this.props.toggle()

    this.setState({
      milestoneTitle: '',
      milestones: [''],
    })
  }

  updateMileStones = (data) => {
    this.setState({milestones: data})
  }

  updateTitle = (ev) => {
    ev.preventDefault()

    this.setState({milestoneTitle: ev.target.value})
  }

  checkForm = (ev) => {
    if (ev.target.name.value === '') {
      this.setState({visible: true, errorMessage: 'Please enter a project name!'})
      return true
    } else if (this.state.milestones) {
      for(let i in this.state.milestones) {
        if (this.state.milestones[i] === '') {
          this.setState({visible: true, errorMessage: 'Please enter valid MileStones'})
          return true
        }
      }
    }
  }

  sendMilestones = (ev) => {
    ev.preventDefault()
    
    if (this.checkForm(ev)) return

    let milestones = [];
    for(let i in this.state.milestones) {
      let object = {'name': this.state.milestones[i]}
      milestones.push(object)
    }

    let data = {
      'user': {
        'id': this.props.user.id,
        'name': this.props.user.name
      },
      'project': {
        'name': ev.target.name.value,
        'dueDate': ev.target.date.value,
        // 'completed': false,
        'hidden': false,
        'mileStones': milestones,
      }
    }
    let self = this
    axios.post('http://localhost:5000/users/projects/add', data).then((response) => {
      this.props.toggle()
          axios.get(`http://localhost:5000/users/${self.props.user.id}`)
            .then(function (response) {
              let respData = response.data.user
              self.props.updateUserHome(respData)
              // window.location.reload();
            })
            .catch(function (error) {
              console.log(error);
            });
    }).catch(function (error) {
        self.setState({visible: true, errorMessage: error.message})
    });
  }

  onDismiss = () => {
    this.setState({ visible: false });
  }

  render() {
    const actions = {
      updateMileStones: this.updateMileStones,
    }

    return (
      <Modal backdrop={false} isOpen={this.props.modal} size='lg' toggle={this.props.toggle}>
        <Form onSubmit={this.sendMilestones}>
          <ModalHeader toggle={this.props.toggle}>Add Project</ModalHeader>
          <ModalBody>
            <Alert color="primary" isOpen={this.state.visible} toggle={this.onDismiss}>
              {this.state.errorMessage}
            </Alert>
            <Row>
              <Col xs='12' md='1'/>
              <Col xs='12' md='6'>
                <Input name='name' onChange={this.updateTitle} label="Project Name" defaultValue={this.state.milestoneTitle}/>
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
            })}

            <br/>
            
            <Row>
              <Col sm='12' md='9'/>
              <Col sm='12' md='1'>
                <Button onClick={this.addMilestone} color='info'>
                  <i className="fas fa-plus" />
                </Button>
              </Col>
            </Row>

          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.handleClose}>Close</Button>{' '}
            <Button type='submit' color="primary">Submit MileStones</Button>
          </ModalFooter>
        </Form>
      </Modal>
    );
  }
}


export default AddEvent;
