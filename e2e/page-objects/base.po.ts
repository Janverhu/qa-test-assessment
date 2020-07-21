import { element, by, ElementFinder } from 'protractor';
import { CoApp } from '../component-objects';
import { ChainedXpathElement } from '../core';

export class BasePage {

  coApp: CoApp;

  constructor() {
    this.coApp = new CoApp(new ChainedXpathElement('//body'));
  }

}
