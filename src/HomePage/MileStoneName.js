import React, {Component} from 'react';

import { Input } from 'mdbreact';

import {Row, Col} from 'reactstrap';

class MileStoneName extends Component {
  
  updateMileStones = (ev) => {
    ev.preventDefault()

    let temp = this.props.milestones
    temp[this.props.number - 1] = ev.target.value

    this.props.updateMileStones(temp)
  }

  render() {
    return (
      <Row>
        <Col xs='12' md='1'/>
        <Col xs='12' md='6'>
          <Input onChange={this.updateMileStones} 
                 defaultValue={this.props.milestones[this.props.number - 1]} 
                 label={`MileStone #${this.props.number}`} 
          />
        </Col>
        <Col xs='12' md='1'/>
      </Row>
    );
  }
}

export default MileStoneName;
