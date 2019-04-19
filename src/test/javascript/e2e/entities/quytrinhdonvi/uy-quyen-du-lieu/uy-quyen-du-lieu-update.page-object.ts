import { element, by, ElementFinder } from 'protractor';

export default class UyQuyenDuLieuUpdatePage {
  pageTitle: ElementFinder = element(by.id('gatewayApp.quytrinhdonviUyQuyenDuLieu.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  fromUserIdInput: ElementFinder = element(by.css('input#uy-quyen-du-lieu-fromUserId'));
  toUserIdInput: ElementFinder = element(by.css('input#uy-quyen-du-lieu-toUserId'));
  roleInput: ElementFinder = element(by.css('input#uy-quyen-du-lieu-role'));
  duLieuTienTrinhSelect: ElementFinder = element(by.css('select#uy-quyen-du-lieu-duLieuTienTrinh'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setFromUserIdInput(fromUserId) {
    await this.fromUserIdInput.sendKeys(fromUserId);
  }

  async getFromUserIdInput() {
    return this.fromUserIdInput.getAttribute('value');
  }

  async setToUserIdInput(toUserId) {
    await this.toUserIdInput.sendKeys(toUserId);
  }

  async getToUserIdInput() {
    return this.toUserIdInput.getAttribute('value');
  }

  async setRoleInput(role) {
    await this.roleInput.sendKeys(role);
  }

  async getRoleInput() {
    return this.roleInput.getAttribute('value');
  }

  async duLieuTienTrinhSelectLastOption() {
    await this.duLieuTienTrinhSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async duLieuTienTrinhSelectOption(option) {
    await this.duLieuTienTrinhSelect.sendKeys(option);
  }

  getDuLieuTienTrinhSelect() {
    return this.duLieuTienTrinhSelect;
  }

  async getDuLieuTienTrinhSelectedOption() {
    return this.duLieuTienTrinhSelect.element(by.css('option:checked')).getText();
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
