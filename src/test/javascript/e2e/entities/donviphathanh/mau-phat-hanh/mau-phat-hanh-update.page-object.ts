import { element, by, ElementFinder } from 'protractor';

export default class MauPhatHanhUpdatePage {
  pageTitle: ElementFinder = element(by.id('gatewayApp.donviphathanhMauPhatHanh.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  mauPhatHanhCodeInput: ElementFinder = element(by.css('input#mau-phat-hanh-mauPhatHanhCode'));
  nameInput: ElementFinder = element(by.css('input#mau-phat-hanh-name'));
  userNameInput: ElementFinder = element(by.css('input#mau-phat-hanh-userName'));
  createTimeInput: ElementFinder = element(by.css('input#mau-phat-hanh-createTime'));
  updateTimeInput: ElementFinder = element(by.css('input#mau-phat-hanh-updateTime'));
  statusSelect: ElementFinder = element(by.css('select#mau-phat-hanh-status'));
  programInput: ElementFinder = element(by.css('input#mau-phat-hanh-program'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setMauPhatHanhCodeInput(mauPhatHanhCode) {
    await this.mauPhatHanhCodeInput.sendKeys(mauPhatHanhCode);
  }

  async getMauPhatHanhCodeInput() {
    return this.mauPhatHanhCodeInput.getAttribute('value');
  }

  async setNameInput(name) {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput() {
    return this.nameInput.getAttribute('value');
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
