import { element, by, ElementFinder } from 'protractor';

export default class MauPhatHanhUpdatePage {
  pageTitle: ElementFinder = element(by.id('gatewayApp.donviphathanhMauPhatHanh.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  mauPhatHanhCodeInput: ElementFinder = element(by.css('input#mau-phat-hanh-mauPhatHanhCode'));
  nameInput: ElementFinder = element(by.css('input#mau-phat-hanh-name'));
  statusSelect: ElementFinder = element(by.css('select#mau-phat-hanh-status'));
  phamviSelect: ElementFinder = element(by.css('select#mau-phat-hanh-phamvi'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setMauPhatHanhCodeInput(mauPhatHanhCode) {
    await this.mauPhatHanhCodeInput.sendKeys(mauPhatHanhCode);
  }

  async getMauPhatHanhCodeInput() {
    return this.mauPhatHanhCodeInput.getAttribute('value');
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
  async phamviSelectLastOption() {
    await this.phamviSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async phamviSelectOption(option) {
    await this.phamviSelect.sendKeys(option);
  }

  getPhamviSelect() {
    return this.phamviSelect;
  }

  async getPhamviSelectedOption() {
    return this.phamviSelect.element(by.css('option:checked')).getText();
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
