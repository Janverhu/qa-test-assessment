import { browser, ElementFinder } from 'protractor';
import { Attributes } from '.';

export let defaultTimeout = 20000;

export async function nav(url: string, timeout: number = defaultTimeout) {
    // browser.waitForAngularEnabled(false);
    await browser.get(url, timeout);
}

export async function getCurrentUrl() {
    return browser.driver.wait(async function () {
        return browser.driver.getCurrentUrl().then(function (url) {
            return url.substr(0, url.indexOf('?'));
        });
    }, 5000);
}

export function getRandomdString(length: number) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

export async function getAttributes(ef: ElementFinder) {
    const webElement = ef.getWebElement();
    let attributes: Attributes;
    await browser.executeScript(
        'let items = {}; \
        for (index = 0; index < arguments[0].attributes.length; ++index) { \
            items[arguments[0].attributes[index].name] = arguments[0].attributes[index].value \
        }; \
        return items;', webElement).then(function (attrs) {
            attributes = new Attributes(attrs);
        });
    return attributes;
}


export function saveGlobalVar(key:string, variable:any) {
  if (global['vars'][key]) {
    global['vars'][key] = variable;
  } else {
    global['vars'] = Object.defineProperty(global['vars'], key, {
      value: variable,
      writable: true,
      enumerable: true,
      configurable: true
    });
  }
}
