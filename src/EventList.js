import React, {Component } from 'react';
import Event from './Event';
import { Row, Container } from 'react-bootstrap';
import { WarningAlert } from './Alert';

class EventList extends Component {
  render() {
    const { events } = this.props;

    return (
      <Container className="eventlist-container">
				<Row className="d-flex justify-content-center event-list">
					{!navigator.onLine ? (
						<WarningAlert text="You are offline, the events list has been loaded from the Cache!" />
					) : (
						''
					)}
      <ul className="EventList">
        {events.map(event => 
          <li key={event.id}>
            <Event event={event} />
          </li>
        )}
      </ul>
      </Row>
      </Container>
    );
  };
}

export default EventList;