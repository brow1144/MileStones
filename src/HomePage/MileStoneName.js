import React, {Component} from 'react';

import { Input } from 'mdbreact';

import {Row, Col} from 'reactstrap';
import './MileStoneName.css';

class MileStoneName extends Component {
  
  updateMileStones = (ev) => {
    ev.preventDefault()

    let temp = this.props.milestones
    temp[this.props.number - 1] = ev.target.value
    // console.log(temp)

    this.setState({text: ev.target.value})
    this.props.updateMileStones(temp)
  }

  handleDelete = (ev) => {
    ev.preventDefault()

    let temp = this.props.milestones
    temp.splice(this.props.number - 1, 1)
    
    this.props.updateMileStones(temp)
  }



  render() {
    return (
      <Row>
        <Col className='deleteDiv' onClick={this.handleDelete} xs='1' md='1'> 
          <i className="fas fa-times delete" />
        </Col>
        <Col xs='11' md='6'>
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
