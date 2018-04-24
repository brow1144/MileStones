import React from 'react';

import {ListGroup, ListGroupItem} from 'mdbreact';

const SideEvents = (props) => {
  return (
    <div className="sideFloat z-depth-2">
      <ListGroup>
        <ListGroupItem href="#">
          <div className="d-flex w-100 justify-content-between">
            <h5 className="mb-1">{props.project.name}</h5>
            <small>{props.project.numberOfDays} days to go</small>
          </div>
          <p className="mb-1">Make sure to work on the 
          <b> {props.project.mileStoneToday} </b>
           milestone today!</p>
          <small>Due {props.project.dueDate}</small>
        </ListGroupItem>
      </ListGroup>
    </div>
  );
}


export default SideEvents;
