import { loadFeature, defineFeature } from "jest-cucumber";
import React from 'react';
import { mount } from 'enzyme';

import App from '../App';

// loadFeature expects file path to start from project root
const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, test => {
 
  

  test('When the user types a number into the textbox, the number of events displayed should match the input number', ({ given, when, then }) => {
    let AppWrapper;
    given('the main page is open', () => {
      AppWrapper = mount(<App />);
    });

    when('the user types a number into the number of events textbox', () => {
      AppWrapper.update();
      AppWrapper.find('#number-of-events__input').simulate('change', { target: { value: '1' } });
    });
    then('the number of events displayed should match the number input by the user unless there are fewer events than the specified number.', () => {
      AppWrapper.update();
      expect(AppWrapper.find('.event')).toHaveLength(1);
    });
  });

});