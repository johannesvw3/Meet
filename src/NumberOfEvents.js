import React, { Component } from 'react';
import { ErrorAlert, WarningAlert } from './Alert';

class NumberOfEvents extends Component {
  constructor(props) {
    super(props);

    this.state = {
      number: 32,
      displayErrorText: null,
      errorText: '',
    };
  }
 
  handleInputChanged = (event) => {
    let value = event.target.value;
    let cleanedValue = this.RemoveNonNumeric(value);
    if (value < 1 || value > 50 || value !== cleanedValue ) {
      this.setState({
        number: cleanedValue,
        displayErrorText: true,
        errorText: 'Please enter a number between 1 and 50',
      })
    } else {
      this.setState({
        number: cleanedValue,
        displayErrorText: false,
        errorText: '',
      });
    }

    if (this.props.updateNumberOfEvents && value > 50) {
      this.props.updateNumberOfEvents(50);
  } else if (this.props.updateNumberOfEvents) {
      this.props.updateNumberOfEvents(cleanedValue);
  }
}

  RemoveNonNumeric = (text) => {
    return text.replace(/[^0-9]/g, '');
  }


  render() {
    const { currentNumberOfEvents } = this.props;
    const { number } = this.state;
    const displayWarning = currentNumberOfEvents < number;
    const warningText = 'There are not that many events available';
    return (
      <div className="number-of-events">
        <div className="number-of-events_error">
          { displayWarning && <WarningAlert text={warningText} />}
        </div>
        <div className="number-over-50-error">
          <ErrorAlert text={this.state.errorText} />
        </div>
        <div className="number-of-events__grid">
          <label id="number-of-events__label" htmlFor="number-of-events__input">Number of Events:</label>
          <input id="number-of-events__input" value={this.state.number} onChange={this.handleInputChanged} />
        </div>
      </div>
    )
  }
}

export default NumberOfEvents;