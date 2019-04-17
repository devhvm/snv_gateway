import { element, by, ElementFinder } from 'protractor';

export default class MenuRoleUpdatePage {
  pageTitle: ElementFinder = element(by.id('gatewayApp.phanquyenchucnangMenuRole.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  menuItemRoleCodeInput: ElementFinder = element(by.css('input#menu-role-menuItemRoleCode'));
  roleInput: ElementFinder = element(by.css('input#menu-role-role'));
  nameInput: ElementFinder = element(by.css('input#menu-role-name'));
  menuItemSelect: ElementFinder = element(by.css('select#menu-role-menuItem'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setMenuItemRoleCodeInput(menuItemRoleCode) {
    await this.menuItemRoleCodeInput.sendKeys(menuItemRoleCode);
  }

  async getMenuItemRoleCodeInput() {
    return this.menuItemRoleCodeInput.getAttribute('value');
  }

  async setRoleInput(role) {
    await this.roleInput.sendKeys(role);
  }

  async getRoleInput() {
    return this.roleInput.getAttribute('value');
  }

  async setNameInput(name) {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput() {
    return this.nameInput.getAttribute('value');
  }

  async menuItemSelectLastOption() {
    await this.menuItemSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async menuItemSelectOption(option) {
    await this.menuItemSelect.sendKeys(option);
  }

  getMenuItemSelect() {
    return this.menuItemSelect;
  }

  async getMenuItemSelectedOption() {
    return this.menuItemSelect.element(by.css('option:checked')).getText();
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
