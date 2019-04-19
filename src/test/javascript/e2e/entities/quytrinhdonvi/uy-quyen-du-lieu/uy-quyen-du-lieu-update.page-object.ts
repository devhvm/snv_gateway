import { element, by, ElementFinder } from 'protractor';

export default class UyQuyenDuLieuUpdatePage {
  pageTitle: ElementFinder = element(by.id('gatewayApp.quytrinhdonviUyQuyenDuLieu.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  fromUserIdInput: ElementFinder = element(by.css('input#uy-quyen-du-lieu-fromUserId'));
  toUserIdInput: ElementFinder = element(by.css('input#uy-quyen-du-lieu-toUserId'));
  roleInput: ElementFinder = element(by.css('input#uy-quyen-du-lieu-role'));
  quyTrinhDonViSelect: ElementFinder = element(by.css('select#uy-quyen-du-lieu-quyTrinhDonVi'));

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

  async quyTrinhDonViSelectLastOption() {
    await this.quyTrinhDonViSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async quyTrinhDonViSelectOption(option) {
    await this.quyTrinhDonViSelect.sendKeys(option);
  }

  getQuyTrinhDonViSelect() {
    return this.quyTrinhDonViSelect;
  }

  async getQuyTrinhDonViSelectedOption() {
    return this.quyTrinhDonViSelect.element(by.css('option:checked')).getText();
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
