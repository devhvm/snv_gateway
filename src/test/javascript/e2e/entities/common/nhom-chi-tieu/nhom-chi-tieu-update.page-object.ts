import { element, by, ElementFinder } from 'protractor';

export default class NhomChiTieuUpdatePage {
  pageTitle: ElementFinder = element(by.id('gatewayApp.commonNhomChiTieu.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  nhomChiTieuCodeInput: ElementFinder = element(by.css('input#nhom-chi-tieu-nhomChiTieuCode'));
  nameInput: ElementFinder = element(by.css('input#nhom-chi-tieu-name'));
  statusSelect: ElementFinder = element(by.css('select#nhom-chi-tieu-status'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setNhomChiTieuCodeInput(nhomChiTieuCode) {
    await this.nhomChiTieuCodeInput.sendKeys(nhomChiTieuCode);
  }

  async getNhomChiTieuCodeInput() {
    return this.nhomChiTieuCodeInput.getAttribute('value');
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
