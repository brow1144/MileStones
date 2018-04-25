import React from 'react';

import {ListGroupItem} from 'mdbreact';

const SideEvents = (props) => {
  return (
    <ListGroupItem style={{color: `${props.project.color}`}} href="/">
      <div className="d-flex w-100 justify-content-between">
        <h5 className="mb-1">{props.project.name}</h5>
        <small>{props.project.numberOfDays} days to go</small>
      </div>

      {props.project.mileStoneToday === undefined || props.project.mileStoneToday === null || props.project.mileStoneToday === ''
      ?
        <p className="mb-1">No MileStones to work on today!</p>
      :
        <p className="mb-1">Make sure to work on the 
        <b> {props.project.mileStoneToday} </b>
        milestone today!</p>
      }

      <small>Due {props.project.dueDate}</small>
    </ListGroupItem>
  );
}


export default SideEvents;
