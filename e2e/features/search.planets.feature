Feature: Search for a Star Wars planet

    Scenario: Planet by full name
        Given I navigate to searchpage
        When I select Planets
        And I search for the name "Yavin IV"
        Then I see the planet details
        And The planet detail contains Population
        And The planet detail contains Climate
        And The planet detail contains Gravity

    Scenario: Invalid Planet search
        Given I navigate to searchpage
        When I select Planets
        And I search for the name "InvalidName"
        Then I see not found in the results
        And I don't see the planet details

    Scenario: Planet by partial name
        Given I navigate to searchpage
        When I select Planets
        And I search for the name "le"
        Then Multiple planet details appear
        And All returned planets names have the searched string in the mame

    Scenario: Search for existing planet and do same search on people
        Given I navigate to searchpage
        When I select Planets
        And I search for the name "Alderaan"
        Then I see the planet details
        When I select People
        And I click search
        Then I see not found in the results
