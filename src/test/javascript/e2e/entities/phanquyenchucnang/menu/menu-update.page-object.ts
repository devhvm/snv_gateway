import { element, by, ElementFinder } from 'protractor';

export default class MenuUpdatePage {
  pageTitle: ElementFinder = element(by.id('gatewayApp.phanquyenchucnangMenu.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  menuCodeInput: ElementFinder = element(by.css('input#menu-menuCode'));
  nameInput: ElementFinder = element(by.css('input#menu-name'));
  iconInput: ElementFinder = element(by.css('input#menu-icon'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setMenuCodeInput(menuCode) {
    await this.menuCodeInput.sendKeys(menuCode);
  }

  async getMenuCodeInput() {
    return this.menuCodeInput.getAttribute('value');
  }

  async setNameInput(name) {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput() {
    return this.nameInput.getAttribute('value');
  }

  async setIconInput(icon) {
    await this.iconInput.sendKeys(icon);
  }

  async getIconInput() {
    return this.iconInput.getAttribute('value');
  }

  async save() {
    await this.saveButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }

  getSaveButton() {
    return this.saveButton;
  }
}
