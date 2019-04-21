import { element, by, ElementFinder } from 'protractor';

export default class ScreenUpdatePage {
  pageTitle: ElementFinder = element(by.id('gatewayApp.phanquyenchucnangScreen.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  screenCodeInput: ElementFinder = element(by.css('input#screen-screenCode'));
  nameInput: ElementFinder = element(by.css('input#screen-name'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setScreenCodeInput(screenCode) {
    await this.screenCodeInput.sendKeys(screenCode);
  }

  async getScreenCodeInput() {
    return this.screenCodeInput.getAttribute('value');
  }

  async setNameInput(name) {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput() {
    return this.nameInput.getAttribute('value');
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
