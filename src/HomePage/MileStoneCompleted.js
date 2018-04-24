import React, {Component} from 'react';

import Checkbox from 'material-ui/Checkbox';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class MileStoneCompleted extends Component { 
  constructor(props) {
    super(props)

    this.state = {
      checked: this.props.data.completed,
    }
  }

  handleCheck = () => {
    this.setState({checked: !this.state.checked})
    let temp = this.props.data
    temp.completed = !this.state.checked
    this.props.updateProject(temp)
  }

  render() {  
    return (
      <MuiThemeProvider>
        <div>
          <Checkbox
            checked={this.state.checked}
            onCheck={this.handleCheck}
            label={this.props.data.name}
          />
        </div>
      </MuiThemeProvider>
    )
  }
}

export default MileStoneCompleted;
