import { ComponentObject } from '.';
import { ChainedXpathElement } from '../core';

export class CoSearchForm extends ComponentObject {

    form: ChainedXpathElement;
    peopleRadio: ChainedXpathElement;
    peopleRadioLabel: ChainedXpathElement;
    planetsRadio: ChainedXpathElement;
    planetsRadioLabel: ChainedXpathElement;
    searchInputLabel: ChainedXpathElement;
    searchInput: ChainedXpathElement;
    submitBtn: ChainedXpathElement;

    constructor(parent: ChainedXpathElement, self= false) {
      // component root path from template, path should also be useable in xpath axes so should not start with //
      super(parent, 'app-search-form', self);
      this.form = this.root.getChild('//form');
      this.peopleRadio = this.form.getChild('//input[@id="people"]');
      this.peopleRadioLabel = this.form.getChild('//label[@for="people"]');
      this.planetsRadio = this.form.getChild('//input[@id="planets"]');
      this.planetsRadioLabel = this.form.getChild('//label[@for="planets"]');
      this.searchInputLabel = this.form.getChild('//input[@for="query"]');
      this.searchInput = this.form.getChild('//input[@id="query"]');
      this.submitBtn = this.form.getChild('//button[@type="submit"]');
    }
}
