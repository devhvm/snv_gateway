import { element, by, ElementFinder } from 'protractor';

export default class MauPhatHanhTieuChiUpdatePage {
  pageTitle: ElementFinder = element(by.id('gatewayApp.donviphathanhMauPhatHanhTieuChi.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  tieuchiSelect: ElementFinder = element(by.css('select#mau-phat-hanh-tieu-chi-tieuchi'));
  mauphathanhSelect: ElementFinder = element(by.css('select#mau-phat-hanh-tieu-chi-mauphathanh'));

  getPageTitle() {
    return this.pageTitle;
  }

  async tieuchiSelectLastOption() {
    await this.tieuchiSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async tieuchiSelectOption(option) {
    await this.tieuchiSelect.sendKeys(option);
  }

  getTieuchiSelect() {
    return this.tieuchiSelect;
  }

  async getTieuchiSelectedOption() {
    return this.tieuchiSelect.element(by.css('option:checked')).getText();
  }

  async mauphathanhSelectLastOption() {
    await this.mauphathanhSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async mauphathanhSelectOption(option) {
    await this.mauphathanhSelect.sendKeys(option);
  }

  getMauphathanhSelect() {
    return this.mauphathanhSelect;
  }

  async getMauphathanhSelectedOption() {
    return this.mauphathanhSelect.element(by.css('option:checked')).getText();
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
