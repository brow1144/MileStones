import React, {Component} from 'react';

import {Button, Modal, ModalBody, ModalHeader, ModalFooter} from 'mdbreact';

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
        <Modal isOpen={this.props.editProjectModal} toggle={this.toggleEditProject} side position="top-right">
          <ModalHeader toggle={this.toggleEditProject}>Modal title</ModalHeader>
          <ModalBody>
            Edit this project!
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggleEditProject}>Close</Button>{' '}
            <Button color="primary">Save changes</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default EditProject;
