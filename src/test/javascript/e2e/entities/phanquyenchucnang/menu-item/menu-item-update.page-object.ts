import { element, by, ElementFinder } from 'protractor';

export default class MenuItemUpdatePage {
  pageTitle: ElementFinder = element(by.id('gatewayApp.phanquyenchucnangMenuItem.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  menuItemCodeInput: ElementFinder = element(by.css('input#menu-item-menuItemCode'));
  nameInput: ElementFinder = element(by.css('input#menu-item-name'));
  iconInput: ElementFinder = element(by.css('input#menu-item-icon'));
  screenSelect: ElementFinder = element(by.css('select#menu-item-screen'));
  menuSelect: ElementFinder = element(by.css('select#menu-item-menu'));

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

  async screenSelectLastOption() {
    await this.screenSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async screenSelectOption(option) {
    await this.screenSelect.sendKeys(option);
  }

  getScreenSelect() {
    return this.screenSelect;
  }

  async getScreenSelectedOption() {
    return this.screenSelect.element(by.css('option:checked')).getText();
  }

  async menuSelectLastOption() {
    await this.menuSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async menuSelectOption(option) {
    await this.menuSelect.sendKeys(option);
  }

  getMenuSelect() {
    return this.menuSelect;
  }

  async getMenuSelectedOption() {
    return this.menuSelect.element(by.css('option:checked')).getText();
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
