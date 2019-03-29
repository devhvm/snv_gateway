import { element, by, ElementFinder } from 'protractor';

export default class TieuChiUpdatePage {
  pageTitle: ElementFinder = element(by.id('gatewayApp.donviphathanhTieuChi.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  tieuChiCodeInput: ElementFinder = element(by.css('input#tieu-chi-tieuChiCode'));
  nameInput: ElementFinder = element(by.css('input#tieu-chi-name'));
  userNameInput: ElementFinder = element(by.css('input#tieu-chi-userName'));
  createTimeInput: ElementFinder = element(by.css('input#tieu-chi-createTime'));
  updateTimeInput: ElementFinder = element(by.css('input#tieu-chi-updateTime'));
  statusSelect: ElementFinder = element(by.css('select#tieu-chi-status'));
  programInput: ElementFinder = element(by.css('input#tieu-chi-program'));
  kycongboSelect: ElementFinder = element(by.css('select#tieu-chi-kycongbo'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setTieuChiCodeInput(tieuChiCode) {
    await this.tieuChiCodeInput.sendKeys(tieuChiCode);
  }

  async getTieuChiCodeInput() {
    return this.tieuChiCodeInput.getAttribute('value');
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

  async kycongboSelectLastOption() {
    await this.kycongboSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async kycongboSelectOption(option) {
    await this.kycongboSelect.sendKeys(option);
  }

  getKycongboSelect() {
    return this.kycongboSelect;
  }

  async getKycongboSelectedOption() {
    return this.kycongboSelect.element(by.css('option:checked')).getText();
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
