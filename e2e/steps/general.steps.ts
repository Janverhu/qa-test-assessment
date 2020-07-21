import { browser } from 'protractor';
import { nav } from '../core';

const { Given } = require('cucumber');
const chai = require('chai');
chai.use(require('chai-as-promised'));
chai.use(require('chai-smoothie'));


Given('I navigate to {word}', { timeout: 60 * 1000 }, async (word: string) => {
    // I want to use the base url in order to be able to run the tests on different environments
    // I give the possibility to pass a named path I keep in params as this could differ on different environments
    await nav(browser.baseUrl + browser.params.pagePaths[word]);
});
