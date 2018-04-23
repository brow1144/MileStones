import React, {Component} from 'react';

import moment from 'moment';
import axios from 'axios';

import {Button, Modal, ModalBody, ModalHeader, ModalFooter, Input } from 'mdbreact';
import {Row, Col, Form} from 'reactstrap';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import MileStoneName from './MileStoneName';

class AddEvent extends Component {

  constructor(props) {
    super(props)
    
    this.state = {
      startDate: moment(),
      milestones: [], 
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

  updateMileStones = (data) => {
    this.setState({milestones: data})
  }

  sendMilestones = (ev) => {
    ev.preventDefault()
    
    let milestones = [];
    for(let i in this.state.milestones) {
      let object = {'name': this.state.milestones[i]}
      milestones.push(object)
    }

    console.log(this.props.user.id)
    console.log(this.props.user.name)
    console.log(ev.target.name.value)
    console.log(ev.target.date.value)
    console.log(milestones)

    let data = {
      'user': {
        'id': this.props.user.id,
        'name': this.props.user.name
      },
      'project': {
        'name': ev.target.name.value,
        'dueDate': ev.target.date.value,
        'mileStones': milestones,
      }
    }
    
    axios.post('http://localhost:5000/users/projects', data).then(function (response) {
      console.log(response);
    }).catch(function (error) {
        console.log(error);
    });
  }


  render() {
    const actions = {
      updateMileStones: this.updateMileStones,
    }

    return (
      <Modal backdrop={false} isOpen={this.props.modal} size='lg' toggle={this.props.toggle}>
        <Form onSubmit={this.sendMilestones}>
          <ModalHeader toggle={this.props.toggle}>Modal title</ModalHeader>
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
            <Button color="secondary" onClick={this.props.toggle}>Close</Button>{' '}
            <Button type='submit' color="primary">Submit MileStones</Button>
          </ModalFooter>
        </Form>
      </Modal>
    );
  }
}


export default AddEvent;
