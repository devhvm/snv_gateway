import { element, by, ElementFinder } from 'protractor';

export default class QuyTrinhDonViUpdatePage {
  pageTitle: ElementFinder = element(by.id('gatewayApp.quytrinhdonviQuyTrinhDonVi.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  quyTrinhCodeInput: ElementFinder = element(by.css('input#quy-trinh-don-vi-quyTrinhCode'));
  nameInput: ElementFinder = element(by.css('input#quy-trinh-don-vi-name'));
  coQuanHanhChinhSelect: ElementFinder = element(by.css('select#quy-trinh-don-vi-coQuanHanhChinh'));

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

  async coQuanHanhChinhSelectLastOption() {
    await this.coQuanHanhChinhSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async coQuanHanhChinhSelectOption(option) {
    await this.coQuanHanhChinhSelect.sendKeys(option);
  }

  getCoQuanHanhChinhSelect() {
    return this.coQuanHanhChinhSelect;
  }

  async getCoQuanHanhChinhSelectedOption() {
    return this.coQuanHanhChinhSelect.element(by.css('option:checked')).getText();
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
