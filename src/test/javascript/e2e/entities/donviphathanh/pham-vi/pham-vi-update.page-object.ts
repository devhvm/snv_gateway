import { element, by, ElementFinder } from 'protractor';

export default class PhamViUpdatePage {
  pageTitle: ElementFinder = element(by.id('gatewayApp.donviphathanhPhamVi.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  beginInput: ElementFinder = element(by.css('input#pham-vi-begin'));
  endInput: ElementFinder = element(by.css('input#pham-vi-end'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setBeginInput(begin) {
    await this.beginInput.sendKeys(begin);
  }

  async getBeginInput() {
    return this.beginInput.getAttribute('value');
  }

  async setEndInput(end) {
    await this.endInput.sendKeys(end);
  }

  async getEndInput() {
    return this.endInput.getAttribute('value');
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
