import React from 'react';

import {ListGroup, ListGroupItem} from 'mdbreact';

const SideEvents = () => {
  return (
    <div className="sideFloat z-depth-2">
      <ListGroup>
        <ListGroupItem href="#">
          <div className="d-flex w-100 justify-content-between">
            <h5 className="mb-1">ENGL 106 Paper</h5>
            <small>3 days to go</small>
          </div>
          <p className="mb-1">Make sure to work on the third page today!</p>
          <small>Due 4/25/18</small>
        </ListGroupItem>
        <ListGroupItem href="#">
          <div className="d-flex w-100 justify-content-between">
            <h5 className="mb-1">MA 162 Exam</h5>
            <small className="text-muted">5 days to go</small>
          </div>
          <p className="mb-1">Make sure to study chapters 5-6 today!</p>
          <small className="text-muted">Due 04/27/18</small>
        </ListGroupItem>
        <ListGroupItem href="#">
          <div className="d-flex w-100 justify-content-between">
            <h5 className="mb-1">CS 250 Lab 6</h5>
            <small className="text-muted">6 days ago</small>
          </div>
          <p className="mb-1">Make sure to work on part 1 of lab 6 today!</p>
          <small className="text-muted">Due 04/28/18</small>
        </ListGroupItem>
        <ListGroupItem href="#">
          <div className="d-flex w-100 justify-content-between">
            <h5 className="mb-1">CS 251 Project 3</h5>
            <small className="text-muted">12 days to go</small>
          </div>
          <p className="mb-1">Make sure to work on part 3 of the project!</p>
          <small className="text-muted">Due 5/01/18</small>
        </ListGroupItem>
      </ListGroup>
    </div>
  );
}


export default SideEvents;
