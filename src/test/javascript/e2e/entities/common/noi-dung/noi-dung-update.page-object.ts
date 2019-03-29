import { element, by, ElementFinder } from 'protractor';

export default class NoiDungUpdatePage {
  pageTitle: ElementFinder = element(by.id('gatewayApp.commonNoiDung.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  noiDungCodeInput: ElementFinder = element(by.css('input#noi-dung-noiDungCode'));
  userNameInput: ElementFinder = element(by.css('input#noi-dung-userName'));
  createTimeInput: ElementFinder = element(by.css('input#noi-dung-createTime'));
  updateTimeInput: ElementFinder = element(by.css('input#noi-dung-updateTime'));
  statusSelect: ElementFinder = element(by.css('select#noi-dung-status'));
  programInput: ElementFinder = element(by.css('input#noi-dung-program'));
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

  async setUserNameInput(userName) {
    await this.userNameInput.sendKeys(userName);
  }

  async getUserNameInput() {
    return this.userNameInput.getAttribute('value');
  }

  async setCreateTimeInput(createTime) {
    await this.createTimeInput.sendKeys(createTime);
  }

  async getCreateTimeInput() {
    return this.createTimeInput.getAttribute('value');
  }

  async setUpdateTimeInput(updateTime) {
    await this.updateTimeInput.sendKeys(updateTime);
  }

  async getUpdateTimeInput() {
    return this.updateTimeInput.getAttribute('value');
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
  async setProgramInput(program) {
    await this.programInput.sendKeys(program);
  }

  async getProgramInput() {
    return this.programInput.getAttribute('value');
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
