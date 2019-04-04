import { element, by, ElementFinder } from 'protractor';

export default class NhomPhanLoaiUpdatePage {
  pageTitle: ElementFinder = element(by.id('gatewayApp.commonNhomPhanLoai.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  nhomPhanLoaiCodeInput: ElementFinder = element(by.css('input#nhom-phan-loai-nhomPhanLoaiCode'));
  nameInput: ElementFinder = element(by.css('input#nhom-phan-loai-name'));
  statusSelect: ElementFinder = element(by.css('select#nhom-phan-loai-status'));
  donvitinhSelect: ElementFinder = element(by.css('select#nhom-phan-loai-donvitinh'));

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
  async donvitinhSelectLastOption() {
    await this.donvitinhSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async donvitinhSelectOption(option) {
    await this.donvitinhSelect.sendKeys(option);
  }

  getDonvitinhSelect() {
    return this.donvitinhSelect;
  }

  async getDonvitinhSelectedOption() {
    return this.donvitinhSelect.element(by.css('option:checked')).getText();
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
