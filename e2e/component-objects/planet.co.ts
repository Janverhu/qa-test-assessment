import { ComponentObject } from '.';
import { ChainedXpathElement } from '../core';

export class CoAPlanetRow extends ComponentObject {

  label: ChainedXpathElement;
  value: ChainedXpathElement;

  constructor(parent: ChainedXpathElement, self= false) {
    // component root path from template, path should also be useable in xpath axes so should not start with //
    super(parent, 'div[@class="row"]', self);
    this.label = this.root.getChild('/div[1]');
    this.value = this.root.getChild('/div[2]');
  }
  getComponentByIndex(index: number) {
      return  new CoAPlanetRow(new ChainedXpathElement('(' + this.root.xpath + ')[' + index + ']'), true);
  }
  getComponentByLabel( label: string) {
      const path = '/div[1][text()[normalize-space()="' + label + '"]]/ancestor-or-self::' + this.rootpath + '[1]';
      return new CoAPlanetRow(this.root.getChild(path), true);
  }
  getComponentByValue( value: string) {
    const path = '/div[2][text()[normalize-space()="' + value + '"]]/ancestor-or-self::' + this.rootpath + '[1]';
    return new CoAPlanetRow(this.root.getChild(path), true);
}
  getComponentContainingText( text: string) {
      const path = '/descendant-or-self::*[contains(text(),"' + text + '")]/ancestor-or-self::' + this.rootpath + '[1]';
      return new CoAPlanetRow(this.root.getChild(path), true);
  }
}

export class CoPlanet extends ComponentObject {

    cardBody: ChainedXpathElement;
    title: ChainedXpathElement;
    row: CoAPlanetRow;

    constructor(parent: ChainedXpathElement, self= false) {
      // component root path from template, path should also be useable in xpath axes so should not start with //
      super(parent, 'app-planet', self);

      this.cardBody = this.root.getChild('//div[contains(@class, "card-body")]');
      this.title = this.cardBody.getChild('//h6[contains(@class, "card-subtitle")]');
      this.row = new CoAPlanetRow(this.cardBody);
    }
    getComponentByIndex(index: number) {
        return  new CoPlanet(new ChainedXpathElement('(' + this.root.xpath + ')[' + index + ']'), true);
    }
    getComponentByText( text: string) {
        const path = '/descendant-or-self::*[text()[normalize-space()="' + text + '"]]/ancestor-or-self::' + this.rootpath + '[1]';
        return new CoPlanet(this.root.getChild(path), true);
    }
    getComponentContainingText( text: string) {
        const path = '/descendant-or-self::*[contains(text(),"' + text + '")]/ancestor-or-self::' + this.rootpath + '[1]';
        return new CoPlanet(this.root.getChild(path), true);
    }
    getComponentByTextAndIndex( text: string, index: number) {
        const co = new CoPlanet(new ChainedXpathElement('(' +
        this.getComponentByText(text).root.xpath + ')[' + index + ']'), true);
        return co;
    }
}

