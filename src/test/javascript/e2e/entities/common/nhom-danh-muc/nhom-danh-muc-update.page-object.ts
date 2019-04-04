import { element, by, ElementFinder } from 'protractor';

export default class NhomDanhMucUpdatePage {
  pageTitle: ElementFinder = element(by.id('gatewayApp.commonNhomDanhMuc.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  nhomDanhMucCodeInput: ElementFinder = element(by.css('input#nhom-danh-muc-nhomDanhMucCode'));
  nameInput: ElementFinder = element(by.css('input#nhom-danh-muc-name'));
  statusSelect: ElementFinder = element(by.css('select#nhom-danh-muc-status'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setNhomDanhMucCodeInput(nhomDanhMucCode) {
    await this.nhomDanhMucCodeInput.sendKeys(nhomDanhMucCode);
  }

  async getNhomDanhMucCodeInput() {
    return this.nhomDanhMucCodeInput.getAttribute('value');
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
