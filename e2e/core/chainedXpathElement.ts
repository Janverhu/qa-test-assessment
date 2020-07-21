import { protractor, ElementFinder, element, by, browser } from 'protractor';
import { clickAndWait, waitElementPresent, waitElementVisible,
  defaultTimeout, Attributes, getAttributes } from '.';
// import { waitForAllLoaders } from './waiters';

export class ChainedXpathElement {
    xpath: string;
    ef: ElementFinder;
    private attributes: Attributes;

    constructor(xpath: string) {
        this.xpath = xpath;
        this.ef = element(by.xpath(xpath));
    }
    async getNormalizedText() {
        let text = await this.ef.getText();
        text = text.replace(/\s\s+/g, ' ').trim();
        return text;
    }
    getChild(xpath: string) {
        return new ChainedXpathElement(this.xpath + xpath);
    }
    async getAttribute(attribute: string) {
      const att = await this.getFirstEF().getAttribute(attribute);
        return att;
    }
    async getAttributes(reload = false) {
        if (!this.attributes || reload) {
            this.attributes = await getAttributes(this.ef);
        }
        return this.attributes;
    }
    getFirstEF() {
        return element.all(by.xpath(this.xpath)).first();
    }
    getEFbyIndex(index: number) {
        return element.all(by.xpath(this.xpath)).get(index);
    }
    getVisibleList() {
        const visibleList = element.all(by.xpath(this.xpath)).filter(function( el ) {
            return el.isDisplayed();
        });
        return visibleList;
    }
    async clickAndWait( timeout: number = defaultTimeout ) {
        await this.mouseMove();
        return await clickAndWait(this.getFirstEF(), timeout);
    }
    async mouseMove() {
        try {
            await browser.actions().mouseMove(this.getFirstEF()).perform();
        } catch (error) {
            // Ignore errors on mousemove, element location fails for certain elements. Retry with a scroll
            const webElement = await this.getFirstEF().getWebElement();
            await browser.executeScript('arguments[0].scrollIntoView();', webElement);
        }
    }
    async waitElementPresent(timeout: number = defaultTimeout ) {
        return waitElementPresent(this.getFirstEF(), timeout);
    }
    async waitElementVisible(timeout: number = defaultTimeout ) {
        return waitElementVisible(this.getFirstEF(), timeout);
    }
    async sendKeys(arg: any) {
      return this.ef.sendKeys(arg);
  }

}
