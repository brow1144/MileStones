import React, {Component} from 'react';
import axios from 'axios';

import {Modal, ModalBody, ModalHeader, ListGroupItem, ListGroup } from 'mdbreact';
import {Row, Col} from 'reactstrap';


class Hidden extends Component {

  constructor(props) {
    super(props)
    
    this.state = {
        updatedProject: {},
    }
  }

  unhide = (id) => {
    for (let i in this.props.projects) {
      if (this.props.projects[i].id === id) {
        let newProject = {
          'user': {
              'id': this.props.user.id,
              'name': this.props.user.name
          },
          'project': {
              'name': this.props.projects[i].name,
              'dueDate': this.props.projects[i].dueDate,
              'completed': this.props.projects[i].completed,
              'hidden': false,
              'id': id, 
              'mileStones': this.props.projects[i].mileStones,
          }
        }
        let newUser = this.props.user;
        newUser.projects[i] = newProject.project;
        this.props.updateUser(newUser);
        this.props.loadCalendar()
        this.props.getSideData()
        this.setState({updatedProject: newProject}, () => {
            this.sendUpdatedProject();
            this.props.toggleHid();
        })
      }
    }
  }

  sendUpdatedProject = () => {
    axios.put('https://milestones.mybluemix.net/users/projects/update', this.state.updatedProject).then((response) => {
      let self = this;
          axios.get(`https://milestones.mybluemix.net/users/${this.props.user.id}`)
            .then((response) => {
              let respData = response.data.user
              self.props.updateUserHome(respData)
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
    <Modal backdrop={false} isOpen={this.props.modalHid} size='lg' toggle={this.props.toggleHid}>
        <ModalHeader toggle={this.props.toggleHid}>Hidden Projects</ModalHeader>
        <ModalBody>
        <div className="sideFloat">
            <ListGroup>
                {this.props.hiddenBar.map((key, index) => {
                    return (
                        <ListGroupItem key={index} style={{color: `${key.color}`, cursor: 'auto'}}>
                            <Row>
                                <Col xs={5} style={{textAlign: 'left'}}>
                                    <div className="d-flex w-100 justify-content-between" >
                                        <h5 className="mb-1">{key.name}</h5>
                                    </div>
                                    <small>Due {key.dueDate}</small>
                                </Col>
                                <Col xs={7} style={{textAlign: 'right'}}>
                                    <div onClick={() => {this.unhide(key.id)}}>
                                        <i style={{fontSize: '2.5rem', cursor: 'pointer'}} className="fas fa-eye"></i>
                                    </div>
                                </Col>
                            </Row>
                        </ListGroupItem>
            ) 
            })}
            </ListGroup>
        </div>
        </ModalBody>
    </Modal>
    );
  }
}


export default Hidden;