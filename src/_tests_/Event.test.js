import React from 'react';
import { shallow } from 'enzyme';
import Event from '../Event';
import { mockData } from '../mock-data';

describe('<Event /> component', () => {

  let EventWrapper;
  beforeAll(() => {
    EventWrapper = shallow(<Event event={mockData[1]} />);
  });

  test("Summary is displayed", () => {
    expect(EventWrapper.find(".summary")).toHaveLength(1);
  });

  test("Location is displayed", () => {
    expect(EventWrapper.find(".location")).toHaveLength(1);
  });

  test("Date and timezone are displayed", () => {
    expect(EventWrapper.find(".start-date")).toHaveLength(1);
  });

  test("Show details button is rendered", () => {
    expect(EventWrapper.find(".show-details")).toHaveLength(1);
  });

  test("event element is collapsed by default", () => {
    expect(EventWrapper.state("collapsed")).toBe(true);
  });

  test("clicking on show details button shows extra details", () => {
    EventWrapper.setState({
      collapsed: true,
    });
    EventWrapper.find(".show-details").simulate("click");
    expect(EventWrapper.state("collapsed")).toBe(false);
  });

  test("clicking on hide details button hides extra details", () => {
    EventWrapper.setState({
      collapsed: false,
    });
    EventWrapper.find(".hide-details").simulate("click");
    expect(EventWrapper.state("collapsed")).toBe(true);
  });

});