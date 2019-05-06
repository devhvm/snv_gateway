import { element, by, ElementFinder } from 'protractor';

export default class LoaiQuyTrinhUpdatePage {
  pageTitle: ElementFinder = element(by.id('gatewayApp.quanlyquytrinhLoaiQuyTrinh.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  loaiQuyTrinhCodeInput: ElementFinder = element(by.css('input#loai-quy-trinh-loaiQuyTrinhCode'));
  methodNameInput: ElementFinder = element(by.css('input#loai-quy-trinh-methodName'));
  entityNameInput: ElementFinder = element(by.css('input#loai-quy-trinh-entityName'));
  serviceNameInput: ElementFinder = element(by.css('input#loai-quy-trinh-serviceName'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setLoaiQuyTrinhCodeInput(loaiQuyTrinhCode) {
    await this.loaiQuyTrinhCodeInput.sendKeys(loaiQuyTrinhCode);
  }

  async getLoaiQuyTrinhCodeInput() {
    return this.loaiQuyTrinhCodeInput.getAttribute('value');
  }

  async setMethodNameInput(methodName) {
    await this.methodNameInput.sendKeys(methodName);
  }

  async getMethodNameInput() {
    return this.methodNameInput.getAttribute('value');
  }

  async setEntityNameInput(entityName) {
    await this.entityNameInput.sendKeys(entityName);
  }

  async getEntityNameInput() {
    return this.entityNameInput.getAttribute('value');
  }

  async setServiceNameInput(serviceName) {
    await this.serviceNameInput.sendKeys(serviceName);
  }

  async getServiceNameInput() {
    return this.serviceNameInput.getAttribute('value');
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
