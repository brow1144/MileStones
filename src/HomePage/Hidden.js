import React, {Component} from 'react';

import moment from 'moment';
import axios from 'axios';

import {Button, Modal, ModalBody, ModalHeader, ModalFooter, Input, ListGroupItem, ListGroup } from 'mdbreact';
import {Row, Col, Form, Alert} from 'reactstrap';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import MileStoneName from './MileStoneName';

class Hidden extends Component {

  constructor(props) {
    super(props)
    
    this.state = {}
  }

  render() {
    return (
    <Modal backdrop={false} isOpen={this.props.modalHid} size='lg' toggle={this.props.toggleHid}>
        <ModalHeader toggle={this.props.toggleHid}>Modal title</ModalHeader>
        <ModalBody>
        <div className="sideFloat">
            <ListGroup>
                {this.props.hiddenBar.map((key, index) => {
                    return (
                        <ListGroupItem key={index} style={{color: `${key.color}`, cursor: 'auto'}} href="#">
                            <div className="d-flex w-100 justify-content-between">
                                <h5 className="mb-1">{key.name}</h5>
                            </div>
                            <small>Due {key.dueDate}</small>
                        </ListGroupItem>
            ) 
            })}
            </ListGroup>
        </div>
        </ModalBody>
        <ModalFooter>
            <Button color="secondary" onClick={this.props.toggleHid}>Close</Button>{' '}
            <Button color="primary">Save changes</Button>
        </ModalFooter>
    </Modal>
    );
  }
}


export default Hidden;