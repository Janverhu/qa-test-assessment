import { BasePage } from '.';
import { CoSearchForm, CoCharacter, CoPlanet } from '../component-objects';

export class SearchPage extends BasePage {

  coSearchForm: CoSearchForm;
  coCharacter: CoCharacter;
  coPlanet: CoPlanet;

  constructor() {
    super();
    this.coSearchForm = new CoSearchForm(this.coApp.content);
    this.coCharacter = new CoCharacter(this.coApp.content);
    this.coPlanet = new CoPlanet(this.coApp.content);
  }
}
