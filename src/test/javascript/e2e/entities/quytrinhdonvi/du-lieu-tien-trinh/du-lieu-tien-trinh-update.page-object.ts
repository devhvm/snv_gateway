import { element, by, ElementFinder } from 'protractor';

export default class DuLieuTienTrinhUpdatePage {
  pageTitle: ElementFinder = element(by.id('gatewayApp.quytrinhdonviDuLieuTienTrinh.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  tienTrinhCodeInput: ElementFinder = element(by.css('input#du-lieu-tien-trinh-tienTrinhCode'));
  duLieuCodeInput: ElementFinder = element(by.css('input#du-lieu-tien-trinh-duLieuCode'));
  fromUserIdInput: ElementFinder = element(by.css('input#du-lieu-tien-trinh-fromUserId'));
  toUserIdInput: ElementFinder = element(by.css('input#du-lieu-tien-trinh-toUserId'));
  levelInput: ElementFinder = element(by.css('input#du-lieu-tien-trinh-level'));
  noteInput: ElementFinder = element(by.css('input#du-lieu-tien-trinh-note'));
  quyTrinhDonViSelect: ElementFinder = element(by.css('select#du-lieu-tien-trinh-quyTrinhDonVi'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setTienTrinhCodeInput(tienTrinhCode) {
    await this.tienTrinhCodeInput.sendKeys(tienTrinhCode);
  }

  async getTienTrinhCodeInput() {
    return this.tienTrinhCodeInput.getAttribute('value');
  }

  async setDuLieuCodeInput(duLieuCode) {
    await this.duLieuCodeInput.sendKeys(duLieuCode);
  }

  async getDuLieuCodeInput() {
    return this.duLieuCodeInput.getAttribute('value');
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

  async setLevelInput(level) {
    await this.levelInput.sendKeys(level);
  }

  async getLevelInput() {
    return this.levelInput.getAttribute('value');
  }

  async setNoteInput(note) {
    await this.noteInput.sendKeys(note);
  }

  async getNoteInput() {
    return this.noteInput.getAttribute('value');
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
