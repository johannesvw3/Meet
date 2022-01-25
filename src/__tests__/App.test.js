import React from "react";
import { shallow, mount } from "enzyme";
import App from "../App";
import { mockData } from "../mock-data";
import { getEvents } from "../api";
import { extractLocations } from '../common';

import EventList from '../EventList';
import CitySearch from '../CitySearch';
import NumberOfEvents from '../NumberOfEvents';

describe('<App /> component', () => {
  let AppWrapper;
  beforeAll(() => {
    AppWrapper = shallow(<App />);
  });

  test('render list of events', () => {
    expect(AppWrapper.find(EventList)).toHaveLength(1);
  });

  test('render CitySearch', () => {
    expect(AppWrapper.find(CitySearch)).toHaveLength(1);
  });

  test('render number of events', () => {
    expect(AppWrapper.find(NumberOfEvents)).toHaveLength(1);
  });
});

describe('<App /> integration', () => {
  test('App passes "events" state as a prop to EventList', () => {
    const AppWrapper = mount(<App />);
    const AppEventsState = AppWrapper.state('events');

    expect(AppEventsState).not.toEqual(undefined);
    expect(AppWrapper.find(EventList).props().events).toEqual(AppEventsState);
    AppWrapper.unmount();
  });

  test('App passes "locations" state as a prop to CitySearch', () => {
    const AppWrapper = mount(<App />);
    const AppLocationsState = AppWrapper.state('locations');

    expect(AppLocationsState).not.toEqual(undefined);
    expect(AppWrapper.find(CitySearch).props().locations).toEqual(AppLocationsState);
    AppWrapper.unmount();
  });

  test('get list of events matching the city selected by user', async () => {
    const AppWrapper = mount(<App />);
    const CitySearchWrapper = AppWrapper.find(CitySearch);
    const locations = extractLocations(mockData);
    CitySearchWrapper.setState({ suggestions: locations });
    const suggestions = CitySearchWrapper.state('suggestions');
    const selectedIndex = Math.floor(Math.random() * (suggestions.length));
    const selectedCity = suggestions[selectedIndex];
    await CitySearchWrapper.instance().handleItemClicked(selectedCity);
    const allEvents = await getEvents();
    const eventsToShow = allEvents.filter(event => event.location === selectedCity);
    expect(AppWrapper.state('events')).toEqual(eventsToShow);
    AppWrapper.unmount();
  });

  test('get list of events when user selects "See all cities"', async () => {
    const AppWrapper = mount(<App />);
    const suggestionItems = AppWrapper.find(CitySearch).find('.suggestions li');
    await suggestionItems.at(suggestionItems.length - 1).simulate('click');
    const numberInput = AppWrapper.find(NumberOfEvents).find('#number-of-events__input');
    const eventObject = { target: { value: '2' } };
    await numberInput.at(0).simulate('change', eventObject);
    expect(AppWrapper.state('events')).toHaveLength(2);
    AppWrapper.unmount();
  });

  /* Specify number of events */
  test('The number of events loaded initially should be 32', async () => {
    const AppWrapper = mount(<App />);
    expect(AppWrapper.state('numberOfEvents')).toBe('32');
    AppWrapper.unmount();
  })

  test('The state of "numberOfEvents" within App changes when number input changes', async () => {
    const AppWrapper = mount(<App />);
    const numberInput = AppWrapper.find(NumberOfEvents).find('#number-of-events__input');
    const eventObject = { target: { value: '15' } };
    numberInput.at(0).simulate('change', eventObject);
    expect(AppWrapper.state('numberOfEvents')).toBe('15');
    AppWrapper.unmount();
  })

  



  test('When the number of events field changes, the number of events changes', async () => {
    const AppWrapper = mount(<App />);
    const numberInput = AppWrapper.find(NumberOfEvents).find('#number-of-events__input');
    const eventObject = { target: { value: '2' } };
    await numberInput.at(0).simulate('change', eventObject);
    expect(AppWrapper.state('events')).toHaveLength(2);
    AppWrapper.unmount();
  })

});