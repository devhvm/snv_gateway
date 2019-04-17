import { element, by, ElementFinder } from 'protractor';

export default class AcessDenyUpdatePage {
  pageTitle: ElementFinder = element(by.id('gatewayApp.phanquyenchucnangAcessDeny.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  userIdInput: ElementFinder = element(by.css('input#acess-deny-userId'));
  menuItemSelect: ElementFinder = element(by.css('select#acess-deny-menuItem'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setUserIdInput(userId) {
    await this.userIdInput.sendKeys(userId);
  }

  async getUserIdInput() {
    return this.userIdInput.getAttribute('value');
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
