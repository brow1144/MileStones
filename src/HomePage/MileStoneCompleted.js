import React, {Component} from 'react';

import Checkbox from 'material-ui/Checkbox';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class MileStoneCompleted extends Component { 
  constructor(props) {
    super(props)

    this.state = {
      checked: false,
    }
  }

  updateCheck() {
    this.setState((oldState) => {
      return {
        checked: !oldState.checked,
      };
    });
  }

  render() {
    const styles = {
      block: {
        maxWidth: 250,
      },
      checkbox: {
        marginBottom: 16,
      },
    };

    return (
      <MuiThemeProvider>
        <div style={styles.block}>
          <Checkbox
              label={this.props.data.name}
              style={styles.checkbox}
            />
        </div>
      </MuiThemeProvider>
    )
  }
}

export default MileStoneCompleted;
