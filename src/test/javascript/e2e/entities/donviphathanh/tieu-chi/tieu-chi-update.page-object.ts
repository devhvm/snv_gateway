import { element, by, ElementFinder } from 'protractor';

export default class TieuChiUpdatePage {
  pageTitle: ElementFinder = element(by.id('gatewayApp.donviphathanhTieuChi.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  nameInput: ElementFinder = element(by.css('input#tieu-chi-name'));
  statusSelect: ElementFinder = element(by.css('select#tieu-chi-status'));
  kycongboSelect: ElementFinder = element(by.css('select#tieu-chi-kycongbo'));

  getPageTitle() {
    return this.pageTitle;
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
  async kycongboSelectLastOption() {
    await this.kycongboSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async kycongboSelectOption(option) {
    await this.kycongboSelect.sendKeys(option);
  }

  getKycongboSelect() {
    return this.kycongboSelect;
  }

  async getKycongboSelectedOption() {
    return this.kycongboSelect.element(by.css('option:checked')).getText();
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
