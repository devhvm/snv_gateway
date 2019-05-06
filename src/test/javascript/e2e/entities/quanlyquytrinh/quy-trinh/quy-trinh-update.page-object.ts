import { element, by, ElementFinder } from 'protractor';

export default class QuyTrinhUpdatePage {
  pageTitle: ElementFinder = element(by.id('gatewayApp.quanlyquytrinhQuyTrinh.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  quyTrinhCodeInput: ElementFinder = element(by.css('input#quy-trinh-quyTrinhCode'));
  nameInput: ElementFinder = element(by.css('input#quy-trinh-name'));
  loaiQuyTrinhSelect: ElementFinder = element(by.css('select#quy-trinh-loaiQuyTrinh'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setQuyTrinhCodeInput(quyTrinhCode) {
    await this.quyTrinhCodeInput.sendKeys(quyTrinhCode);
  }

  async getQuyTrinhCodeInput() {
    return this.quyTrinhCodeInput.getAttribute('value');
  }

  async setNameInput(name) {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput() {
    return this.nameInput.getAttribute('value');
  }

  async loaiQuyTrinhSelectLastOption() {
    await this.loaiQuyTrinhSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async loaiQuyTrinhSelectOption(option) {
    await this.loaiQuyTrinhSelect.sendKeys(option);
  }

  getLoaiQuyTrinhSelect() {
    return this.loaiQuyTrinhSelect;
  }

  async getLoaiQuyTrinhSelectedOption() {
    return this.loaiQuyTrinhSelect.element(by.css('option:checked')).getText();
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
