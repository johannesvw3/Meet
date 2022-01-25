import React from 'react';
import { shallow } from 'enzyme';
import Event from '../Event';
import '@testing-library/jest-dom';


import { mockData } from '../mock-data';

describe('<CitySearch /> component', () => {

  let EventWrapper;
  const mockEvent = mockData[0];

  beforeAll(() => {
    EventWrapper = shallow(<Event event={mockEvent}/>);
  });

  /* Collapsed component tests */
  test('Event name elem renders', () => { 
    expect(EventWrapper.find('.event__name')).toHaveLength(1);
  });

  test('Event name renders correct name', () => {
    console.log(mockData.summary);
    expect(EventWrapper.find('.event__name').at(0).text()).toBe('Learn JavaScript');
  })

  test('Event start time elem renders', () => { 
    expect(EventWrapper.find('.event__start')).toHaveLength(1);
  });

  test('Event start time renders correct event start time', () => {
    expect(EventWrapper.find('.event__start').at(0).text()).toBe('2020-05-19T16:00:00+02:00');
  })

  test('Event title line 2 renders', () => {
    expect(EventWrapper.find('.event__title-line-2')).toHaveLength(1);
  })

  test('Event title line 2 renders correct event name', () => {
    expect(EventWrapper.find('.event__title-line-2__title').at(0).text()).toBe('Learn JavaScript');
  })

  test('Event title line 2 renders correct city name', () => {
    expect(EventWrapper.find('.event__title-line-2__city').at(0).text()).toBe('London, UK');
  })

  test('Event title line 2 renders correctly "@[name] | [city]"', () => {
    expect(EventWrapper.find('.event__title-line-2').at(0).text()).toBe('@Learn JavaScript | London, UK');
  })

  test('Details button renders', () => {
    expect(EventWrapper.find('.event__details-button')).toHaveLength(1);
  })

  /* Collapse, expand functionality */
  test('Event state.expanded is false on load', () => {
    expect(EventWrapper.state('expanded')).toBe(false);
  })

  test('Event state.expanded changes from true to false when clicked', () => {
    const detailsButton = EventWrapper.find('.event__details-button').first();
    EventWrapper.setState({ expanded: true });
    detailsButton.at(0).simulate('click');
    expect(EventWrapper.state('expanded')).toBe(false);
  })

  test('Event state.expanded changes from false to true when clicked', () => {
    const detailsButton = EventWrapper.find('.event__details-button').first();
    EventWrapper.setState({ expanded: false });
    detailsButton.at(0).simulate('click'); 
    expect(EventWrapper.state('expanded')).toBe(true);
  })

  /* More details collapses/expands based on state.expanded */
  test('event__more-details is hidden on load', () => {
    EventWrapper.setState({expanded: false});
    expect(EventWrapper.find('.event__more-details')).toHaveLength(0);
  })

  test('event__more-details is rendered when clicking on details button', () => {
    const detailsButton = EventWrapper.find('.event__details-button').first();
    detailsButton.at(0).simulate('click');
    expect(EventWrapper.find('.event__more-details')).toHaveLength(1);
  })

  test('When event__more-details is visible, is hidden when clicking on details button', () => {
    EventWrapper.setState({expanded: true});
    const detailsButton = EventWrapper.find('.event__details-button').first();
    detailsButton.at(0).simulate('click');
    expect(EventWrapper.find('.event__more-details')).toHaveLength(0);
  })

  /* Expanded card contains the necessary information */
  test('Event more details link renders', () => {
    EventWrapper.setState({expanded: true});
    expect(EventWrapper.find('.event__more-details__link-line')).toHaveLength(1);
  })

  test('Event link renders correct link', () => {
    EventWrapper.setState({expanded: true});
    expect(EventWrapper.find('.event__more-details__link-line__link').text()).toBe('https://www.google.com/calendar/event?eid=NGVhaHM5Z2hraHJ2a2xkNzJob2d1OXBoM2VfMjAyMDA1MTlUMTQwMDAwWiBmdWxsc3RhY2t3ZWJkZXZAY2FyZWVyZm91bmRyeS5jb20');
  })

  test('Event description element renders', () => {
    EventWrapper.setState({expanded: true});
    expect(EventWrapper.find('.event__more-details__description')).toHaveLength(1);
  })

  test('Event more details description renders correct description', () => {
    EventWrapper.setState({expanded: true});
    expect(EventWrapper.find('.event__more-details__description').text()).toBe('Have you wondered how you can ask Google to show you the list of the top ten must-see places in London? And how Google presents you the list? How can you submit the details of an application? Well, JavaScript is doing these. :) \n\nJavascript offers interactivity to a dull, static website. Come, learn JavaScript with us and make those beautiful websites.');
  })

  /* Text on details button changes based on collapsed/not collapsed */
  test('The text of the event details button is "More details" on load', () => {
    expect(EventWrapper.find('.event__details-button').text()).toBe('More details');
  })

  test('The text of the event details button changes to "Hide details" after clicking button to expand event', () => {
    EventWrapper.setState({expanded: false});
    const detailsButton = EventWrapper.find('.event__details-button').first();
    detailsButton.at(0).simulate('click');
    expect(EventWrapper.find('.event__details-button').text()).toBe('Hide details');
  })

  test('The text of the event details button changes to "More details" after clicking button to hide event', () => {
    EventWrapper.setState({expanded: false});
    const detailsButton = EventWrapper.find('.event__details-button').first();
    detailsButton.at(0).simulate('click');
    detailsButton.at(0).simulate('click');

    expect(EventWrapper.find('.event__details-button').text()).toBe('More details');
  })


});