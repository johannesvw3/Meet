import React from 'react';
import { shallow } from 'enzyme';
import NumberOfEvents from '../NumberOfEvents';

describe('<NumberOfEvents /> component', () => {
  let NumberOfEventsWrapper;
  beforeAll(() => {
    NumberOfEventsWrapper = shallow(<NumberOfEvents />);
  });

  test('render number of events elem', () => {
    expect(NumberOfEventsWrapper.find('.number-of-events')).toHaveLength(1);
  })

  test('render number of events label', () => {
    expect(NumberOfEventsWrapper.find('#number-of-events__label')).toHaveLength(1);
  });

  test('render number of events input', () => {
    expect(NumberOfEventsWrapper.find('#number-of-events__input')).toHaveLength(1);
  })

  test('renders input number correctly', () => {
    const number = NumberOfEventsWrapper.state('number');
    expect(NumberOfEventsWrapper.find('#number-of-events__input').prop('value')).toBe(number);
  })

  test('change state when number input changes', () => {
    NumberOfEventsWrapper.setState({
      number: '32'
    });
    const eventObject = { target: { value: '15' }};
    NumberOfEventsWrapper.find('#number-of-events__input').simulate('change', eventObject);
    expect(NumberOfEventsWrapper.state('number')).toBe('15');
  })

  test('ignore text input of non-numeric values - test-1', () => {
    const eventObject = { target: { value: '15a' }};
    NumberOfEventsWrapper.find('#number-of-events__input').simulate('change', eventObject);
    expect(NumberOfEventsWrapper.state('number')).toBe('15');
  })

  test('ignore text input of non-numeric values - test-2', () => {
    const eventObject = { target: { value: '1_5' }};
    NumberOfEventsWrapper.find('#number-of-events__input').simulate('change', eventObject);
    expect(NumberOfEventsWrapper.state('number')).toBe('15');
  })

  test('ignore text input of non-numeric values - test-3', () => {
    const eventObject = { target: { value: '-x1_5~' }};
    NumberOfEventsWrapper.find('#number-of-events__input').simulate('change', eventObject);
    expect(NumberOfEventsWrapper.state('number')).toBe('15');
  })

});