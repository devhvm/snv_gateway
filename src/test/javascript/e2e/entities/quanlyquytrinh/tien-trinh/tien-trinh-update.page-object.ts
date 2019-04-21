import { element, by, ElementFinder } from 'protractor';

export default class TienTrinhUpdatePage {
  pageTitle: ElementFinder = element(by.id('gatewayApp.quanlyquytrinhTienTrinh.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  menuItemCodeInput: ElementFinder = element(by.css('input#tien-trinh-menuItemCode'));
  nameInput: ElementFinder = element(by.css('input#tien-trinh-name'));
  screenCodeInput: ElementFinder = element(by.css('input#tien-trinh-screenCode'));
  statusInput: ElementFinder = element(by.css('input#tien-trinh-status'));
  quyTrinhSelect: ElementFinder = element(by.css('select#tien-trinh-quyTrinh'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setMenuItemCodeInput(menuItemCode) {
    await this.menuItemCodeInput.sendKeys(menuItemCode);
  }

  async getMenuItemCodeInput() {
    return this.menuItemCodeInput.getAttribute('value');
  }

  async setNameInput(name) {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput() {
    return this.nameInput.getAttribute('value');
  }

  async setScreenCodeInput(screenCode) {
    await this.screenCodeInput.sendKeys(screenCode);
  }

  async getScreenCodeInput() {
    return this.screenCodeInput.getAttribute('value');
  }

  async setStatusInput(status) {
    await this.statusInput.sendKeys(status);
  }

  async getStatusInput() {
    return this.statusInput.getAttribute('value');
  }

  async quyTrinhSelectLastOption() {
    await this.quyTrinhSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async quyTrinhSelectOption(option) {
    await this.quyTrinhSelect.sendKeys(option);
  }

  getQuyTrinhSelect() {
    return this.quyTrinhSelect;
  }

  async getQuyTrinhSelectedOption() {
    return this.quyTrinhSelect.element(by.css('option:checked')).getText();
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
