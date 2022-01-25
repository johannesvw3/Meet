Feature: Specify number of events



  Scenario: When the user types a number into the textbox, the number of events displayed should match the input number
    Given the main page is open
    When the user types a number into the number of events textbox
    Then the number of events displayed should match the number input by the user unless there are fewer events than the specified number.