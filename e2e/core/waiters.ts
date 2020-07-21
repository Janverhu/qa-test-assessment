import { browser, protractor, ElementFinder } from 'protractor';
import { defaultTimeout, nav, ChainedXpathElement } from '.';
import { CoApp } from '../component-objects';

export async function clickAndWait(el: ElementFinder, timeout: number = defaultTimeout) {
    const start = new Date().getTime();
    const EC = protractor.ExpectedConditions;
    browser.wait(EC.elementToBeClickable(el), timeout, 'Timeout while waiting for element to become clickable');
    await el.click();
    const passedTime = new Date().getTime() - start;
    await waitForLoader(timeout - passedTime);
}

export async function waitForLoader(timeout: number = defaultTimeout) {
  const app = new CoApp(new ChainedXpathElement('//body'));
  const EC = protractor.ExpectedConditions;
  await browser.wait(EC.not(EC.presenceOf(app.loading.ef)), timeout);
}

export async function waitElementPresent(el: ElementFinder, timeout: number = defaultTimeout) {
    const EC = protractor.ExpectedConditions;
    await browser.wait(EC.presenceOf(el), timeout, 'Element taking too long to appear in the DOM. Locator: ' + el.locator);
}

export async function waitElementVisible(el: ElementFinder, timeout: number = defaultTimeout) {
  const EC = protractor.ExpectedConditions;
  await browser.wait(EC.visibilityOf(el), timeout, 'Element taking too long to become visible. Locator: ' + el.locator);
}

export async function navAndWait(url: string, timeout: number = defaultTimeout) {
    const start = new Date().getTime();
    nav(url, timeout);
    const passedTime = new Date().getTime() - start;
    await waitForLoader(timeout - passedTime);
}

export async function waitForAttributeValue(element: ChainedXpathElement, attribute: string, expectedValue: string,
    timeout: number = defaultTimeout) {
    const EC = protractor.ExpectedConditions;
    const checkEl = element.getChild('/self::*[@' + attribute + '="' + expectedValue + '"]');
    await browser.wait(EC.presenceOf(checkEl.ef),
    timeout, 'Wait on attribute ' + attribute + ' to become ' + expectedValue + ' timed out on element with xpath' + element.xpath);
}

export async function waitForAttributeToContainValue(element: ChainedXpathElement, attribute: string, expectedValue: string,
    timeout: number = defaultTimeout) {
    const EC = protractor.ExpectedConditions;
    const checkEl = element.getChild('/self::*[contains(@' + attribute + ', "' + expectedValue + '")]');
    await browser.wait(EC.presenceOf(checkEl.ef),
    timeout, 'Wait on attribute ' + attribute + ' to become ' + expectedValue + ' timed out on element with xpath' + element.xpath);
}

export async function waitForElementTextToChange(element: ChainedXpathElement, currentText: string, timeout: number = defaultTimeout) {
    const EC = protractor.ExpectedConditions;
    const checkEl = element.getChild('/self::*[text()[normalize-space()="' + currentText + '"]]');
    await browser.wait(EC.stalenessOf(checkEl.ef),
    timeout, 'Wait on element text to change timed out on element with xpath' + checkEl.xpath);
}
