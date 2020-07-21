Feature: Search for a Star Wars character

    Scenario: Character by full name
        Given I navigate to searchpage
        When I select People
        And I search for the name "Luke Skywalker"
        Then I see the character details
        And The character detail contains Gender
        And The character detail contains Birth year
        And The character detail contains Eye color
        And The character detail contains Skin color

    Scenario: Invalid Character search
        Given I navigate to searchpage
        When I select People
        And I search for the name "InvalidName"
        Then I see not found in the results
        And I don't see the character details

    Scenario: Character by partial name
        Given I navigate to searchpage
        When I select People
        And I search for the name "an"
        Then Multiple character details appear
        And All returned character names have the searched string in the mame

    Scenario: Clear the Search form
        Given I navigate to searchpage
        When I select People
        And I search for the name "an"
        Then Multiple character details appear
        When I clear the search field and click search
        Then No character details appear

    Scenario: Search Character by hitting ENTER
        Given I navigate to searchpage
        When I select People
        And I submit search with ENTER key for the name "Luke Skywalker"
        Then I see the character details
