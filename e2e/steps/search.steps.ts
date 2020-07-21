import { protractor, } from 'protractor';
import { SearchPage } from '../page-objects';
import { saveGlobalVar } from '../core';

const { When, Then } = require('cucumber');
const chai = require('chai');
chai.use(require('chai-as-promised'));
chai.use(require('chai-smoothie'));

const searchPage: SearchPage = new SearchPage();

When('I select People', { timeout: 60 * 1000 }, async () => {
  await searchPage.coSearchForm.peopleRadioLabel.clickAndWait();
});

When('I select Planets', { timeout: 60 * 1000 }, async () => {
  await searchPage.coSearchForm.planetsRadioLabel.clickAndWait();
});

When('I search for the name {string}', { timeout: 60 * 1000 }, async (string) => {
    // I'm sure there must be a more elegant way to pass variables between steps (World?),
    // in the short notice this is what I could come up with, to add it as a property of a global variable
    saveGlobalVar('searched', string);
    await searchPage.coSearchForm.searchInput.sendKeys(string);
    await  searchPage.coSearchForm.submitBtn.clickAndWait();
});

When('I click search', { timeout: 60 * 1000 }, async () => {
  await  searchPage.coSearchForm.submitBtn.clickAndWait();
});

When('I submit search with ENTER key for the name {string}', { timeout: 60 * 1000 }, async (string) => {
  saveGlobalVar('searched', string);
  await searchPage.coSearchForm.searchInput.sendKeys(string);
  await  searchPage.coSearchForm.searchInput.sendKeys(protractor.Key.ENTER);
});

When('I clear the search field and click search', { timeout: 60 * 1000 }, async () => {
  await searchPage.coSearchForm.searchInput.ef.clear();
  await  searchPage.coSearchForm.submitBtn.clickAndWait();
});

Then('I see not found in the results', { timeout: 60 * 1000 }, async () => {
  await chai.expect(searchPage.coApp.content.getNormalizedText())
  .to.eventually.contain('Not found.');
});

Then('I see the character details', { timeout: 60 * 1000 }, async () => {
  await chai.expect(searchPage.coCharacter.getComponentByText(global['vars']['searched']).root.ef)
  .to.be.displayed;
});

Then('The character detail contains Gender', { timeout: 60 * 1000 }, async () => {
  await chai.expect(searchPage.coCharacter.getComponentByText(global['vars']['searched']).row.getComponentByLabel('Gender:').value.ef)
  .to.be.displayed;
});

Then('The character detail contains Birth year', { timeout: 60 * 1000 }, async () => {
  await chai.expect(searchPage.coCharacter.getComponentByText(global['vars']['searched']).row.getComponentByLabel('Birth year:').value.ef)
  .to.be.displayed;
});

Then('The character detail contains Eye color', { timeout: 60 * 1000 }, async () => {
  await chai.expect(searchPage.coCharacter.getComponentByText(global['vars']['searched']).row.getComponentByLabel('Eye color:').value.ef)
  .to.be.displayed;
});

Then('The character detail contains Skin color', { timeout: 60 * 1000 }, async () => {
  await chai.expect(searchPage.coCharacter.getComponentByText(global['vars']['searched']).row.getComponentByLabel('Skin color:').value.ef)
  .to.be.displayed;
});

Then('I don\'t see the character details', { timeout: 60 * 1000 }, async () => {
  await chai.expect(searchPage.coCharacter.getComponentByText(global['vars']['searched']).root.ef)
  .not.to.be.present;
});

Then('Multiple character details appear', { timeout: 60 * 1000 }, async () => {
  await chai.expect(searchPage.coCharacter.getCount())
  .to.eventually.be.above(1);
});

Then('No character details appear', { timeout: 60 * 1000 }, async () => {
  await chai.expect(searchPage.coCharacter.getCount())
  .to.eventually.equal(0);
});

Then('All returned character names have the searched string in the mame', { timeout: 60 * 1000 }, async () => {
  await searchPage.coCharacter.title.getVisibleList().each(async function( el ) {
    await chai.expect((await el.getText()).toLowerCase())
    .to.contain(global['vars']['searched'].toLowerCase());
  });
});

Then('The planet detail contains Population', { timeout: 60 * 1000 }, async () => {
  await chai.expect(searchPage.coPlanet.getComponentByText(global['vars']['searched']).row.getComponentByLabel('Population:').value.ef)
  .to.be.displayed;
});

Then('The planet detail contains Climate', { timeout: 60 * 1000 }, async () => {
  await chai.expect(searchPage.coPlanet.getComponentByText(global['vars']['searched']).row.getComponentByLabel('Climate:').value.ef)
  .to.be.displayed;
});

Then('The planet detail contains Gravity', { timeout: 60 * 1000 }, async () => {
  await chai.expect(searchPage.coPlanet.getComponentByText(global['vars']['searched']).row.getComponentByLabel('Gravity:').value.ef)
  .to.be.displayed;
});


Then('I don\'t see the planet details', { timeout: 60 * 1000 }, async () => {
  await chai.expect(searchPage.coPlanet.getComponentByIndex(1).root.ef)
    .not.to.be.present;
});

Then('I see the planet details', { timeout: 60 * 1000 }, async () => {
    await chai.expect(searchPage.coPlanet.getComponentByText(global['vars']['searched']).root.ef)
    .to.be.displayed;
});

Then('Multiple planet details appear', { timeout: 60 * 1000 }, async () => {
  await chai.expect(searchPage.coPlanet.getCount())
  .to.eventually.be.above(1);
});

Then('All returned planets names have the searched string in the mame', { timeout: 60 * 1000 }, async () => {
  await searchPage.coPlanet.title.getVisibleList().each(async function( el ) {
    await chai.expect((await el.getText()).toLowerCase())
    .to.contain(global['vars']['searched'].toLowerCase());
  });
});
