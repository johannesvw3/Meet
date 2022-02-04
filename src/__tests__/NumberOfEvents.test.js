import React, { Component } from 'react';
import { ErrorAlert } from './Alert';

class NumberOfEvents extends Component {
  state = {
    numberEvents: 32,
  };

  handleInputChange = event => {
    const value = event.target.value;

    if (value <= 0) {
      this.setState({
        numberEvents: value,
        errorText: 'Please select a number from 1 to 32 only.'
      })
    } else if (value > 32) {
      this.setState({
        numberEvents: value,
        errorText: 'Please select a number from 1 to 32 only.'
      })
    } else {
      this.setState({
        numberEvents: value,
        errorText: ''
      })
    }
    this.props.updateEventNumber(event);
  }

  render() {
    return (
      <div className='NumberOfEvents'>
        <label htmlFor='numberOfEvent'>Number of Events</label>
        <br></br>
        <input
          type="number"
          className="numberInput"
          value={this.state.numberEvents}
          onChange={this.handleInputChange}
        />
        <ErrorAlert text={this.state.errorText} />
      </div>
    );
  }
}

export default NumberOfEvents;