import { element, by, ElementFinder } from 'protractor';

export default class TienTrinhUpdatePage {
  pageTitle: ElementFinder = element(by.id('gatewayApp.quanlyquytrinhTienTrinh.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  menuItemCodeInput: ElementFinder = element(by.css('input#tien-trinh-menuItemCode'));
  nameInput: ElementFinder = element(by.css('input#tien-trinh-name'));
  iconInput: ElementFinder = element(by.css('input#tien-trinh-icon'));
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

  async setIconInput(icon) {
    await this.iconInput.sendKeys(icon);
  }

  async getIconInput() {
    return this.iconInput.getAttribute('value');
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
