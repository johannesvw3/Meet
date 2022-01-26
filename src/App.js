import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { getEvents, getAccessToken, checkToken } from "./api";
import { extractLocations } from './common';
import { OfflineAlert } from './Alert';
import WelcomeScreen from './WelcomeScreen';

class App extends Component {
 
  state = {
    events: [],
    locations: [],
    numberOfEvents: '32',
    location: 'all',
    showWelcomeScreen: undefined

  };

  async componentDidMount() {
    this.mounted = true;
    const accessToken = localStorage.getItem('access_token');
    const isTokenValid = (await checkToken(accessToken)).error ? false : true;
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code");
    this.setState({ showWelcomeScreen: !(code || isTokenValid) });
    if ((code || isTokenValid) && this.mounted) {
      getEvents().then((events) => {
       if (this.mounted) {
         this.setState({ events, locations: extractLocations(events) });
        }
      });
     }
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

    if (this.state.showWelcomeScreen === undefined) return <div className="App" />

    const { events, locations, numberOfEvents } = this.state;
    return (
      <div className="App">
        {!navigator.onLine ? (<OfflineAlert text="Offline. New events cannot be loaded until you have an internet connection." />) :
         (<OfflineAlert text=''  />)}
        <CitySearch locations={locations} numberOfEvents={numberOfEvents} updateEvents={this.updateEvents} />
        <NumberOfEvents updateNumberOfEvents={number => { this.updateNumberOfEvents(number) }} currentNumberOfEvents={events.length}/>
        <EventList events={events} numberOfEvents={numberOfEvents} />
        <WelcomeScreen
            showWelcomeScreen={this.state.showWelcomeScreen}
            getAccessToken={() => {
              getAccessToken();
            }}
          />
      </div >
    );
  }
}

export default App;