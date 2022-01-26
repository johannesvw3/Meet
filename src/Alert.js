import React, { Component } from 'react';

class Alert extends Component {
  constructor(props) {
    super(props);
    this.color = null;
  }

  getStyle = () => {
    return {
      color: this.color
    };
  }

  render() {
    return (
      <div className="Alert">
        <p style={this.getStyle()} className="error-text">{this.props.text}</p>
      </div>
    );
  }
}

class InfoAlert extends Alert {
  constructor(props) {
    super(props);
    this.color = 'yellow';
  }
}

class ErrorAlert extends Alert {
  constructor(props) {
    super(props);
    this.color = 'red';
  }
}

class WarningAlert extends Alert {
  constructor(props) {
    super(props);
    this.color = 'orange';
  }
}

class OfflineAlert extends Alert {
  constructor(props) {
      super(props);
      this.color = '#FFFF00';
  }
}

export { InfoAlert, ErrorAlert, WarningAlert, OfflineAlert };