import { ComponentObject } from '.';
import { ChainedXpathElement } from '../core';

export class CoApp extends ComponentObject {

    content: ChainedXpathElement;
    title: ChainedXpathElement;
    loading: ChainedXpathElement;

    constructor(parent: ChainedXpathElement, self= false) {
      // component root path from template, path should also be useable in xpath axes so should not start with //
      super(parent, 'app-root', self);
      this.content = this.root.getChild('//div[@class="container"]/div[@class="row"]/div[@class="col"]');
      this.title = this.root.getChild('//h1');
      this.loading = this.root.getChild('//div[@data-e2e="app-loading"]');
    }
}
