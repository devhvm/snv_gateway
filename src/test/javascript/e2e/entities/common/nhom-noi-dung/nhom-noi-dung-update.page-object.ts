import { element, by, ElementFinder } from 'protractor';

export default class NhomNoiDungUpdatePage {
  pageTitle: ElementFinder = element(by.id('gatewayApp.commonNhomNoiDung.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  nhomNoiDungCodeInput: ElementFinder = element(by.css('input#nhom-noi-dung-nhomNoiDungCode'));
  nameInput: ElementFinder = element(by.css('input#nhom-noi-dung-name'));
  statusSelect: ElementFinder = element(by.css('select#nhom-noi-dung-status'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setNhomNoiDungCodeInput(nhomNoiDungCode) {
    await this.nhomNoiDungCodeInput.sendKeys(nhomNoiDungCode);
  }

  async getNhomNoiDungCodeInput() {
    return this.nhomNoiDungCodeInput.getAttribute('value');
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
