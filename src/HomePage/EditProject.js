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
    // console.log(this.props.editProject)

    for (let i in this.props.editProject.mileStones) {
      let id = this.props.editProject.mileStones[i].id
      if (milestone.id === id) {
        let tempMile = this.props.editProject.mileStones
        tempMile[i] = milestone

        let newProject = {
          'user': {
              'id': this.props.user.id,
              'name': this.props.user.name
          },
          'project': {
              'name': this.props.editProject.name,
              'dueDate': this.props.editProject.dueDate,
              'completed': this.props.editProject.completed,
              'id': this.props.editProject.id, 
              'mileStones': tempMile,
          }
        }
        this.setState({updatedProject: newProject})
      }
    }
  }

  sendUpdatedProject = () => {
    axios.post('http://localhost:5000/users/projects/add', this.state.updatedProject).then((response) => {
      this.props.toggleEditProject()
      let self = this;
          axios.get(`http://localhost:5000/users/${this.props.user.id}`)
            .then((response) => {
              let respData = response.data.user
              self.props.updateUser(respData)
              window.location.reload();
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
