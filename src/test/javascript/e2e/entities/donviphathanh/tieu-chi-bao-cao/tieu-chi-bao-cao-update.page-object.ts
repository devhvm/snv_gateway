import { element, by, ElementFinder } from 'protractor';

export default class TieuChiBaoCaoUpdatePage {
  pageTitle: ElementFinder = element(by.id('gatewayApp.donviphathanhTieuChiBaoCao.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  tieuChiBaoCaoCodeInput: ElementFinder = element(by.css('input#tieu-chi-bao-cao-tieuChiBaoCaoCode'));
  userNameInput: ElementFinder = element(by.css('input#tieu-chi-bao-cao-userName'));
  createTimeInput: ElementFinder = element(by.css('input#tieu-chi-bao-cao-createTime'));
  updateTimeInput: ElementFinder = element(by.css('input#tieu-chi-bao-cao-updateTime'));
  statusSelect: ElementFinder = element(by.css('select#tieu-chi-bao-cao-status'));
  programInput: ElementFinder = element(by.css('input#tieu-chi-bao-cao-program'));
  tieuchiSelect: ElementFinder = element(by.css('select#tieu-chi-bao-cao-tieuchi'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setTieuChiBaoCaoCodeInput(tieuChiBaoCaoCode) {
    await this.tieuChiBaoCaoCodeInput.sendKeys(tieuChiBaoCaoCode);
  }

  async getTieuChiBaoCaoCodeInput() {
    return this.tieuChiBaoCaoCodeInput.getAttribute('value');
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

  async tieuchiSelectLastOption() {
    await this.tieuchiSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async tieuchiSelectOption(option) {
    await this.tieuchiSelect.sendKeys(option);
  }

  getTieuchiSelect() {
    return this.tieuchiSelect;
  }

  async getTieuchiSelectedOption() {
    return this.tieuchiSelect.element(by.css('option:checked')).getText();
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
