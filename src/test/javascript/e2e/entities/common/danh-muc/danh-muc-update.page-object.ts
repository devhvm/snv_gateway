import { element, by, ElementFinder } from 'protractor';

export default class DanhMucUpdatePage {
  pageTitle: ElementFinder = element(by.id('gatewayApp.commonDanhMuc.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  danhMucCodeInput: ElementFinder = element(by.css('input#danh-muc-danhMucCode'));
  nameInput: ElementFinder = element(by.css('input#danh-muc-name'));
  userNameInput: ElementFinder = element(by.css('input#danh-muc-userName'));
  createTimeInput: ElementFinder = element(by.css('input#danh-muc-createTime'));
  updateTimeInput: ElementFinder = element(by.css('input#danh-muc-updateTime'));
  statusSelect: ElementFinder = element(by.css('select#danh-muc-status'));
  programInput: ElementFinder = element(by.css('input#danh-muc-program'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setDanhMucCodeInput(danhMucCode) {
    await this.danhMucCodeInput.sendKeys(danhMucCode);
  }

  async getDanhMucCodeInput() {
    return this.danhMucCodeInput.getAttribute('value');
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
