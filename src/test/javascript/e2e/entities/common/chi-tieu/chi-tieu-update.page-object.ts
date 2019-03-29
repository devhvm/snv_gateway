import { element, by, ElementFinder } from 'protractor';

export default class ChiTieuUpdatePage {
  pageTitle: ElementFinder = element(by.id('gatewayApp.commonChiTieu.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  chiTieuCodeInput: ElementFinder = element(by.css('input#chi-tieu-chiTieuCode'));
  nameInput: ElementFinder = element(by.css('input#chi-tieu-name'));
  userNameInput: ElementFinder = element(by.css('input#chi-tieu-userName'));
  createTimeInput: ElementFinder = element(by.css('input#chi-tieu-createTime'));
  updateTimeInput: ElementFinder = element(by.css('input#chi-tieu-updateTime'));
  statusSelect: ElementFinder = element(by.css('select#chi-tieu-status'));
  programInput: ElementFinder = element(by.css('input#chi-tieu-program'));
  nhomchitieuSelect: ElementFinder = element(by.css('select#chi-tieu-nhomchitieu'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setChiTieuCodeInput(chiTieuCode) {
    await this.chiTieuCodeInput.sendKeys(chiTieuCode);
  }

  async getChiTieuCodeInput() {
    return this.chiTieuCodeInput.getAttribute('value');
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

  async nhomchitieuSelectLastOption() {
    await this.nhomchitieuSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async nhomchitieuSelectOption(option) {
    await this.nhomchitieuSelect.sendKeys(option);
  }

  getNhomchitieuSelect() {
    return this.nhomchitieuSelect;
  }

  async getNhomchitieuSelectedOption() {
    return this.nhomchitieuSelect.element(by.css('option:checked')).getText();
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
