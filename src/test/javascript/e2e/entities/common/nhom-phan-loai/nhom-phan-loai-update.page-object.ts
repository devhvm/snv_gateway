import { element, by, ElementFinder } from 'protractor';

export default class NhomPhanLoaiUpdatePage {
  pageTitle: ElementFinder = element(by.id('gatewayApp.commonNhomPhanLoai.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  nhomPhanLoaiCodeInput: ElementFinder = element(by.css('input#nhom-phan-loai-nhomPhanLoaiCode'));
  nameInput: ElementFinder = element(by.css('input#nhom-phan-loai-name'));
  userNameInput: ElementFinder = element(by.css('input#nhom-phan-loai-userName'));
  createTimeInput: ElementFinder = element(by.css('input#nhom-phan-loai-createTime'));
  updateTimeInput: ElementFinder = element(by.css('input#nhom-phan-loai-updateTime'));
  statusSelect: ElementFinder = element(by.css('select#nhom-phan-loai-status'));
  programInput: ElementFinder = element(by.css('input#nhom-phan-loai-program'));
  donviSelect: ElementFinder = element(by.css('select#nhom-phan-loai-donvi'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setNhomPhanLoaiCodeInput(nhomPhanLoaiCode) {
    await this.nhomPhanLoaiCodeInput.sendKeys(nhomPhanLoaiCode);
  }

  async getNhomPhanLoaiCodeInput() {
    return this.nhomPhanLoaiCodeInput.getAttribute('value');
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

  async donviSelectLastOption() {
    await this.donviSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async donviSelectOption(option) {
    await this.donviSelect.sendKeys(option);
  }

  getDonviSelect() {
    return this.donviSelect;
  }

  async getDonviSelectedOption() {
    return this.donviSelect.element(by.css('option:checked')).getText();
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
