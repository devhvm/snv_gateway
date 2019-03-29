import { element, by, ElementFinder } from 'protractor';

export default class DonViUpdatePage {
  pageTitle: ElementFinder = element(by.id('gatewayApp.commonDonVi.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  donViCodeInput: ElementFinder = element(by.css('input#don-vi-donViCode'));
  nameInput: ElementFinder = element(by.css('input#don-vi-name'));
  userNameInput: ElementFinder = element(by.css('input#don-vi-userName'));
  createTimeInput: ElementFinder = element(by.css('input#don-vi-createTime'));
  updateTimeInput: ElementFinder = element(by.css('input#don-vi-updateTime'));
  statusSelect: ElementFinder = element(by.css('select#don-vi-status'));
  programInput: ElementFinder = element(by.css('input#don-vi-program'));
  phamviSelect: ElementFinder = element(by.css('select#don-vi-phamvi'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setDonViCodeInput(donViCode) {
    await this.donViCodeInput.sendKeys(donViCode);
  }

  async getDonViCodeInput() {
    return this.donViCodeInput.getAttribute('value');
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

  async phamviSelectLastOption() {
    await this.phamviSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async phamviSelectOption(option) {
    await this.phamviSelect.sendKeys(option);
  }

  getPhamviSelect() {
    return this.phamviSelect;
  }

  async getPhamviSelectedOption() {
    return this.phamviSelect.element(by.css('option:checked')).getText();
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
