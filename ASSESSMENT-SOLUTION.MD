# QA Engineer Assessment Solution

## Introduction

Use this file to document your solution and findings.

Name: your name and optionally contact information

## Remarks
Changes to package.json
- The postinstall script in package.json gave an error on my (windows) machine. Added node in front of the command to fix the issue "node ./node_modules/protractor/bin/webdriver-manager update"
- Added missing protractor-cucumber-framework dependency
- Jasmine is not used but I left it in as it may be desired for unit tests
- Added chai-smoothie dependency to be able to assert on element visibility (and get better failure messages)

Changes to protractor.conf.js
- Removed the duplicate allScriptsTimeout property, left the 45 seconds timeout.
- Corrected the specs path subfolder wildcard (/* -> /**)
- Added missing frameworkPath property
- Added params as this is where I would store any test or environment specific properties, currently only contains pagePaths.
- Create the report dir
- Corrected the ts-node config register
- Init global var I will later use to pass variables between steps (Not sure this is the best way... but it works)

As you will see I prefer xpath, it has a lot of built in methods and it is extensible.
I know that performace wise xpath is not the best but for the applications I've tested so far this was not an issue.

I want to keep my test code as much in sync to the source code and since angular pages are built out of components I also create component-objects.
I use these component-objects to build my page-objects.
I create my component objects on the basis of the source template, like this I know all the functionalities and possibilities of the component and I will also always try to add all (usefull) elements present in the template. This takes longer to set up but saves time in the long run.
Using component objects gives a clear advantage in test maintenance.

There is an issue in protractor with this way of working however, as my component and page objects become a tree I need chained elements to enable this and I found that chaining protractor elements doesn't always work as expected so I created the ChainedXpathElement class (in core folder) that next to the simple task of chaining xpath strings also include some convenience (shortcut) methods to the elementfinder object.

The page objects I also extend from a base page object where I would keep all common page components and logic, again to minimise maintenance.

This is the first time I used cucumber so certain aspects of how I used it may not be optimal.

BUGS
Found one bug from the additional flows:

Scenario: When you search for either a character or a planet and you get one or more results for it, clear the “Search form” and hit the Search button again, you should then get an empty result list (previous search results are removed).
Expected: The result list is empty
Outcome: The result list is not emptied



