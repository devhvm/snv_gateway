import { element, by, ElementFinder } from 'protractor';

export default class DanhMucUpdatePage {
  pageTitle: ElementFinder = element(by.id('gatewayApp.commonDanhMuc.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  danhMucCodeInput: ElementFinder = element(by.css('input#danh-muc-danhMucCode'));
  nameInput: ElementFinder = element(by.css('input#danh-muc-name'));
  statusSelect: ElementFinder = element(by.css('select#danh-muc-status'));
  nhomdanhmucSelect: ElementFinder = element(by.css('select#danh-muc-nhomdanhmuc'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setDanhMucCodeInput(danhMucCode) {
    await this.danhMucCodeInput.sendKeys(danhMucCode);
  }

  async getDanhMucCodeInput() {
    return this.danhMucCodeInput.getAttribute('value');
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
  async nhomdanhmucSelectLastOption() {
    await this.nhomdanhmucSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async nhomdanhmucSelectOption(option) {
    await this.nhomdanhmucSelect.sendKeys(option);
  }

  getNhomdanhmucSelect() {
    return this.nhomdanhmucSelect;
  }

  async getNhomdanhmucSelectedOption() {
    return this.nhomdanhmucSelect.element(by.css('option:checked')).getText();
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
