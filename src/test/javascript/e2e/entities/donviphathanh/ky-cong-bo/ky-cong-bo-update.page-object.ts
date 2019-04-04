import { element, by, ElementFinder } from 'protractor';

export default class KyCongBoUpdatePage {
  pageTitle: ElementFinder = element(by.id('gatewayApp.donviphathanhKyCongBo.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  kyCongBoCodeInput: ElementFinder = element(by.css('input#ky-cong-bo-kyCongBoCode'));
  nameInput: ElementFinder = element(by.css('input#ky-cong-bo-name'));
  statusSelect: ElementFinder = element(by.css('select#ky-cong-bo-status'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setKyCongBoCodeInput(kyCongBoCode) {
    await this.kyCongBoCodeInput.sendKeys(kyCongBoCode);
  }

  async getKyCongBoCodeInput() {
    return this.kyCongBoCodeInput.getAttribute('value');
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
