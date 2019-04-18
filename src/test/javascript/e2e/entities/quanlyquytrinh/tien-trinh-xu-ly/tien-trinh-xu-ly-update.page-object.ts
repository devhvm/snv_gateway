import { element, by, ElementFinder } from 'protractor';

export default class TienTrinhXuLyUpdatePage {
  pageTitle: ElementFinder = element(by.id('gatewayApp.quanlyquytrinhTienTrinhXuLy.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  batdauCodeInput: ElementFinder = element(by.css('input#tien-trinh-xu-ly-batdauCode'));
  ketThucCodeInput: ElementFinder = element(by.css('input#tien-trinh-xu-ly-ketThucCode'));
  tienTrinhSelect: ElementFinder = element(by.css('select#tien-trinh-xu-ly-tienTrinh'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setBatdauCodeInput(batdauCode) {
    await this.batdauCodeInput.sendKeys(batdauCode);
  }

  async getBatdauCodeInput() {
    return this.batdauCodeInput.getAttribute('value');
  }

  async setKetThucCodeInput(ketThucCode) {
    await this.ketThucCodeInput.sendKeys(ketThucCode);
  }

  async getKetThucCodeInput() {
    return this.ketThucCodeInput.getAttribute('value');
  }

  async tienTrinhSelectLastOption() {
    await this.tienTrinhSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async tienTrinhSelectOption(option) {
    await this.tienTrinhSelect.sendKeys(option);
  }

  getTienTrinhSelect() {
    return this.tienTrinhSelect;
  }

  async getTienTrinhSelectedOption() {
    return this.tienTrinhSelect.element(by.css('option:checked')).getText();
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
