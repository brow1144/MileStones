import React, {Component} from 'react';

import {Button, Modal, ModalBody, ModalHeader, ModalFooter} from 'mdbreact';

import MileStoneCompleted from './MileStoneCompleted';

class EditProject extends Component {

  constructor(props) {
    super(props);

    this.state = {

    }
  }

  componentWillMount() {

  }

  render() {
      return (
        <div>
          <Modal backdrop={false} isOpen={this.props.editProjectModal} toggle={this.toggleEditProject}>
            <ModalHeader toggle={this.toggleEditProject}>Edit {this.props.editProject.name}</ModalHeader>
            <ModalBody>
              {this.props.editProject.mileStones.map((value, index) => {
                return (
                  <MileStoneCompleted data={value} key={value.id}/>
                )
              })}
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={this.props.toggleEditProject}>Close</Button>{' '}
              <Button color="primary">Save changes</Button>
            </ModalFooter>
          </Modal>
          
        </div>
      );
    }
}

export default EditProject;
