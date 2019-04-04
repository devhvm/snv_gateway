import { element, by, ElementFinder } from 'protractor';

export default class NoiDungUpdatePage {
  pageTitle: ElementFinder = element(by.id('gatewayApp.commonNoiDung.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  noiDungCodeInput: ElementFinder = element(by.css('input#noi-dung-noiDungCode'));
  statusSelect: ElementFinder = element(by.css('select#noi-dung-status'));
  nhomnoidungSelect: ElementFinder = element(by.css('select#noi-dung-nhomnoidung'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setNoiDungCodeInput(noiDungCode) {
    await this.noiDungCodeInput.sendKeys(noiDungCode);
  }

  async getNoiDungCodeInput() {
    return this.noiDungCodeInput.getAttribute('value');
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
  async nhomnoidungSelectLastOption() {
    await this.nhomnoidungSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async nhomnoidungSelectOption(option) {
    await this.nhomnoidungSelect.sendKeys(option);
  }

  getNhomnoidungSelect() {
    return this.nhomnoidungSelect;
  }

  async getNhomnoidungSelectedOption() {
    return this.nhomnoidungSelect.element(by.css('option:checked')).getText();
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
