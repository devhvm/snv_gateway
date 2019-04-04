import { element, by, ElementFinder } from 'protractor';

export default class ChiTieuUpdatePage {
  pageTitle: ElementFinder = element(by.id('gatewayApp.commonChiTieu.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  chiTieuCodeInput: ElementFinder = element(by.css('input#chi-tieu-chiTieuCode'));
  nameInput: ElementFinder = element(by.css('input#chi-tieu-name'));
  statusSelect: ElementFinder = element(by.css('select#chi-tieu-status'));
  nhomchitieuSelect: ElementFinder = element(by.css('select#chi-tieu-nhomchitieu'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setChiTieuCodeInput(chiTieuCode) {
    await this.chiTieuCodeInput.sendKeys(chiTieuCode);
  }

  async getChiTieuCodeInput() {
    return this.chiTieuCodeInput.getAttribute('value');
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
  async nhomchitieuSelectLastOption() {
    await this.nhomchitieuSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async nhomchitieuSelectOption(option) {
    await this.nhomchitieuSelect.sendKeys(option);
  }

  getNhomchitieuSelect() {
    return this.nhomchitieuSelect;
  }

  async getNhomchitieuSelectedOption() {
    return this.nhomchitieuSelect.element(by.css('option:checked')).getText();
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
