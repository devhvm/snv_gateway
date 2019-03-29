import { element, by, ElementFinder } from 'protractor';

export default class KyCongBoUpdatePage {
  pageTitle: ElementFinder = element(by.id('gatewayApp.donviphathanhKyCongBo.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  kyCongBoCodeInput: ElementFinder = element(by.css('input#ky-cong-bo-kyCongBoCode'));
  nameInput: ElementFinder = element(by.css('input#ky-cong-bo-name'));
  userNameInput: ElementFinder = element(by.css('input#ky-cong-bo-userName'));
  createTimeInput: ElementFinder = element(by.css('input#ky-cong-bo-createTime'));
  updateTimeInput: ElementFinder = element(by.css('input#ky-cong-bo-updateTime'));
  statusSelect: ElementFinder = element(by.css('select#ky-cong-bo-status'));
  programInput: ElementFinder = element(by.css('input#ky-cong-bo-program'));

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
