import { element, by, ElementFinder } from 'protractor';

export default class DonViTinhUpdatePage {
  pageTitle: ElementFinder = element(by.id('gatewayApp.commonDonViTinh.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  donViTinhCodeInput: ElementFinder = element(by.css('input#don-vi-tinh-donViTinhCode'));
  nameInput: ElementFinder = element(by.css('input#don-vi-tinh-name'));
  statusSelect: ElementFinder = element(by.css('select#don-vi-tinh-status'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setDonViTinhCodeInput(donViTinhCode) {
    await this.donViTinhCodeInput.sendKeys(donViTinhCode);
  }

  async getDonViTinhCodeInput() {
    return this.donViTinhCodeInput.getAttribute('value');
  }

  async setNameInput(name) {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput() {
    return this.nameInput.getAttribute('value');
  }

  async setStatusSelect(status) {
    await this.statusSelect.sendKeys(status);
  }

  async getStatusSelect() {
    return this.statusSelect.element(by.css('option:checked')).getText();
  }

  async statusSelectLastOption() {
    await this.statusSelect
      .all(by.tagName('option'))
      .last()
      .click();
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
