import { element, by, ElementFinder } from 'protractor';

export default class DoiTuongUpdatePage {
  pageTitle: ElementFinder = element(by.id('gatewayApp.commonDoiTuong.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  doiTuongCodeInput: ElementFinder = element(by.css('input#doi-tuong-doiTuongCode'));
  nameInput: ElementFinder = element(by.css('input#doi-tuong-name'));
  userNameInput: ElementFinder = element(by.css('input#doi-tuong-userName'));
  createTimeInput: ElementFinder = element(by.css('input#doi-tuong-createTime'));
  updateTimeInput: ElementFinder = element(by.css('input#doi-tuong-updateTime'));
  statusSelect: ElementFinder = element(by.css('select#doi-tuong-status'));
  programInput: ElementFinder = element(by.css('input#doi-tuong-program'));
  nhomphanloaiSelect: ElementFinder = element(by.css('select#doi-tuong-nhomphanloai'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setDoiTuongCodeInput(doiTuongCode) {
    await this.doiTuongCodeInput.sendKeys(doiTuongCode);
  }

  async getDoiTuongCodeInput() {
    return this.doiTuongCodeInput.getAttribute('value');
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

  async nhomphanloaiSelectLastOption() {
    await this.nhomphanloaiSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async nhomphanloaiSelectOption(option) {
    await this.nhomphanloaiSelect.sendKeys(option);
  }

  getNhomphanloaiSelect() {
    return this.nhomphanloaiSelect;
  }

  async getNhomphanloaiSelectedOption() {
    return this.nhomphanloaiSelect.element(by.css('option:checked')).getText();
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
