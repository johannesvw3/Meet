import React, { Component } from 'react';

class NumberOfEvents extends Component {
  
  state = {
    numberOfEvents: 32,
    infoText: ''
  }
  

  render() {
    return (
      <div className="NumberOfEvents">
        <input
          type="text"
          className="number-of-events"
          value={this.state.query}
          onChange={this.handleInputChanged}
        />
        <ul className="numberOfEvents">
        </ul>
      </div>
    );
  }
}

export default NumberOfEvents;