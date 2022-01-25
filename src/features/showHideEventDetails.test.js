import { loadFeature, defineFeature } from "jest-cucumber";
import React from 'react';
import { mount } from 'enzyme';

import App from '../App';

// loadFeature expects file path to start from project root
const feature = loadFeature('./src/features/showHideEventDetails.feature');

defineFeature(feature, test => {
  test('When the user has not clicked on an event, each event element should be collapsed.', ({ given, when, then }) => {
    let AppWrapper;
    given('the main page is open', () => {
      AppWrapper = mount(<App />);
      AppWrapper.update();
    });

    when('the user has not clicked on an event', () => {

    });

    then('each event element should be collapsed.', () => {
      expect(AppWrapper.find('.event__more-details')).toHaveLength(0);
    });
  });



  test('When the user clicks on an expanded event element, the element should collapse.', ({ given, when, then }) => {
    let AppWrapper;
    given('an event element is expanded', async () => {
      AppWrapper = await mount(<App />);
      AppWrapper.update();
      AppWrapper.find('.event__details-button').at(0).simulate('click');
    });

    when('the user clicks on an event', () => {
      AppWrapper.find('.event__details-button').at(0).simulate('click');
      expect(AppWrapper.find('.event__more-details')).toHaveLength(0);

    });

    then('the event element should collapse.', () => {
      expect(AppWrapper.find('.event__more-details')).toHaveLength(0);
    });

  });

});