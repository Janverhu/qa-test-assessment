import { by, element } from 'protractor';
import { ChainedXpathElement } from '../core';

export abstract class ComponentObject {
    rootpath: string;
    openrootpath: string;
    root: ChainedXpathElement;
    parent: ChainedXpathElement;

    constructor(parent: ChainedXpathElement, path: string, self: boolean) {
        this.rootpath = path;
        if (self) {
          this.root = parent.getChild( '/self::' + this.rootpath);
        } else {
          this.root = parent.getChild( '//' + this.rootpath);
        }
        this.parent = parent;
    }

    getCount() {
        const list = element.all(by.xpath(this.root.xpath));
        return list.count();
    }
}
