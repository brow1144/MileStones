import React, {Component} from 'react';

import {Button, Modal, ModalBody, ModalHeader, ModalFooter} from 'mdbreact';

import axios from 'axios';

import MileStoneCompleted from './MileStoneCompleted';

class EditProject extends Component {

  constructor(props) {
    super(props);

    this.state = {
      updatedProject: {},
    }
  }

  updateProject = (milestone) => {
    let project = []
    for (let i in this.props.editProject.mileStones) {
      let id = this.props.editProject.mileStones[i].id
      if (milestone.id === id) {
        let tempMile = this.props.editProject.mileStones
        project = tempMile
        tempMile[i] = milestone

        let newProject = {
          'user': {
              'id': this.props.user.id,
              'name': this.props.user.name
          },
          'project': {
              'name': this.props.editProject.name,
              'dueDate': this.props.editProject.dueDate,
              'completed': false,
              'hidden': false,
              'id': this.props.editProject.id, 
              'mileStones': tempMile,
          }
        }
        this.setState({updatedProject: newProject})
      }
    }
    
    let completed = false
    for (let j in project) {
      if (project[j].completed === true) completed = true
      else return false
    }
    
    if (completed) {
      let newProject = {
        'user': {
            'id': this.props.user.id,
            'name': this.props.user.name
        },
        'project': {
            'name': this.props.editProject.name,
            'dueDate': this.props.editProject.dueDate,
            'completed': true,
            'id': this.props.editProject.id,
            'hidden': false,
            // Possible Race Condition
            'mileStones': this.props.editProject.mileStones,
        }
      }
      this.setState({updatedProject: newProject})
    } 
  }


  sendUpdatedProject = () => {
    axios.put('http://localhost:5000/users/projects/update', this.state.updatedProject).then((response) => {
      let self = this;
          axios.get(`http://localhost:5000/users/${this.props.user.id}`)
            .then((response) => {
              let respData = response.data.user
              self.props.updateUserHome(respData)
              self.props.toggleEditProject()
            })
            .catch((error) => {
              console.log(error);
            });
    }).catch((error) => {
        console.log(error.message)
    });
  }

  render() {
      return (
        <div>
          <Modal backdrop={false} isOpen={this.props.editProjectModal} toggle={this.toggleEditProject}>
            <ModalHeader toggle={this.toggleEditProject}>Edit {this.props.editProject.name}</ModalHeader>
            <ModalBody>
              {this.props.editProject.mileStones.map((value, index) => {
                return (
                  <MileStoneCompleted updateProject={this.updateProject} data={value} key={value.id}/>
                )
              })}
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={this.props.toggleEditProject}>Close</Button>{' '}
              <Button onClick={this.sendUpdatedProject} color="primary">Save changes</Button>
            </ModalFooter>
          </Modal>
          
        </div>
      );
    }
}

export default EditProject;
