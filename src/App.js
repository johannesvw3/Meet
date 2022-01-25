import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { getEvents } from "./api";
import { extractLocations } from './common';

class App extends Component {
 
  state = {
    events: [],
    locations: [],
    numberOfEvents: '32',
    location: 'all'
  };

  componentDidMount() {
    this.mounted = true;
    getEvents().then((events) => {
      if (this.mounted) {
        this.setState({ events, locations: extractLocations(events) });
      }
    });
  }

  componentWillUnmount(){
    this.mounted = false;
  }
 
 updateEvents = (location='all', number=this.state.numberOfEvents) => {
    getEvents().then((events) => {
      const locationEvents = (location === 'all') ?
        events.slice(0, number) :
        events.filter((event) => event.location === location).slice(0, number);

      this.setState({
        events: locationEvents.slice(0, number),
        location
      });
    });
  }
  

  updateNumberOfEvents = (eventCount) => {
    const { currentLocation } = this.state;
    this.setState({
      numberOfEvents: eventCount
    });
    this.updateEvents(currentLocation, eventCount);
  }


  render() {
    const { events, locations, numberOfEvents } = this.state;
    return (
      <div className="App">
        <CitySearch locations={locations} numberOfEvents={numberOfEvents} updateEvents={this.updateEvents} />
        <NumberOfEvents updateNumberOfEvents={number => { this.updateNumberOfEvents(number) }} />
        <EventList events={events} numberOfEvents={numberOfEvents} />
      </div >
    );
  }
}

export default App;