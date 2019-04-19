import { element, by, ElementFinder } from 'protractor';

export default class CoQuanHanhChinhUpdatePage {
  pageTitle: ElementFinder = element(by.id('gatewayApp.quytrinhdonviCoQuanHanhChinh.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  coQuanHanhChinhCodeInput: ElementFinder = element(by.css('input#co-quan-hanh-chinh-coQuanHanhChinhCode'));
  nameInput: ElementFinder = element(by.css('input#co-quan-hanh-chinh-name'));
  descriptionInput: ElementFinder = element(by.css('input#co-quan-hanh-chinh-description'));
  maDinhDanhCodeInput: ElementFinder = element(by.css('input#co-quan-hanh-chinh-maDinhDanhCode'));
  levelInput: ElementFinder = element(by.css('input#co-quan-hanh-chinh-level'));
  statusInput: ElementFinder = element(by.css('input#co-quan-hanh-chinh-status'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setCoQuanHanhChinhCodeInput(coQuanHanhChinhCode) {
    await this.coQuanHanhChinhCodeInput.sendKeys(coQuanHanhChinhCode);
  }

  async getCoQuanHanhChinhCodeInput() {
    return this.coQuanHanhChinhCodeInput.getAttribute('value');
  }

  async setNameInput(name) {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput() {
    return this.nameInput.getAttribute('value');
  }

  async setDescriptionInput(description) {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput() {
    return this.descriptionInput.getAttribute('value');
  }

  async setMaDinhDanhCodeInput(maDinhDanhCode) {
    await this.maDinhDanhCodeInput.sendKeys(maDinhDanhCode);
  }

  async getMaDinhDanhCodeInput() {
    return this.maDinhDanhCodeInput.getAttribute('value');
  }

  async setLevelInput(level) {
    await this.levelInput.sendKeys(level);
  }

  async getLevelInput() {
    return this.levelInput.getAttribute('value');
  }

  async setStatusInput(status) {
    await this.statusInput.sendKeys(status);
  }

  async getStatusInput() {
    return this.statusInput.getAttribute('value');
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
