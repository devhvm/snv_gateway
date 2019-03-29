import { element, by, ElementFinder } from 'protractor';

export default class PhamViUpdatePage {
  pageTitle: ElementFinder = element(by.id('gatewayApp.commonPhamVi.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  beginInput: ElementFinder = element(by.css('input#pham-vi-begin'));
  endInput: ElementFinder = element(by.css('input#pham-vi-end'));
  userNameInput: ElementFinder = element(by.css('input#pham-vi-userName'));
  createTimeInput: ElementFinder = element(by.css('input#pham-vi-createTime'));
  updateTimeInput: ElementFinder = element(by.css('input#pham-vi-updateTime'));
  statusSelect: ElementFinder = element(by.css('select#pham-vi-status'));
  programInput: ElementFinder = element(by.css('input#pham-vi-program'));

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
