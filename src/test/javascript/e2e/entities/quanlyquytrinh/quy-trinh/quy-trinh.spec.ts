/* tslint:disable no-unused-expression */
import { browser, element, by } from 'protractor';

import NavBarPage from './../../../page-objects/navbar-page';
import SignInPage from './../../../page-objects/signin-page';
import QuyTrinhComponentsPage from './quy-trinh.page-object';
import { QuyTrinhDeleteDialog } from './quy-trinh.page-object';
import QuyTrinhUpdatePage from './quy-trinh-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../../util/utils';

const expect = chai.expect;

describe('QuyTrinh e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let quyTrinhUpdatePage: QuyTrinhUpdatePage;
  let quyTrinhComponentsPage: QuyTrinhComponentsPage;
  let quyTrinhDeleteDialog: QuyTrinhDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.waitUntilDisplayed();

    await signInPage.username.sendKeys('admin');
    await signInPage.password.sendKeys('admin');
    await signInPage.loginButton.click();
    await signInPage.waitUntilHidden();
    await waitUntilDisplayed(navBarPage.entityMenu);
  });

  it('should load QuyTrinhs', async () => {
    await navBarPage.getEntityPage('quy-trinh');
    quyTrinhComponentsPage = new QuyTrinhComponentsPage();
    expect(await quyTrinhComponentsPage.getTitle().getText()).to.match(/Quy Trinhs/);
  });

  it('should load create QuyTrinh page', async () => {
    await quyTrinhComponentsPage.clickOnCreateButton();
    quyTrinhUpdatePage = new QuyTrinhUpdatePage();
    expect(await quyTrinhUpdatePage.getPageTitle().getAttribute('id')).to.match(/gatewayApp.quanlyquytrinhQuyTrinh.home.createOrEditLabel/);
  });

  it('should create and save QuyTrinhs', async () => {
    const nbButtonsBeforeCreate = await quyTrinhComponentsPage.countDeleteButtons();

    await quyTrinhUpdatePage.setQuyTrinhCodeInput('quyTrinhCode');
    expect(await quyTrinhUpdatePage.getQuyTrinhCodeInput()).to.match(/quyTrinhCode/);
    await quyTrinhUpdatePage.setNameInput('name');
    expect(await quyTrinhUpdatePage.getNameInput()).to.match(/name/);
    await waitUntilDisplayed(quyTrinhUpdatePage.getSaveButton());
    await quyTrinhUpdatePage.save();
    await waitUntilHidden(quyTrinhUpdatePage.getSaveButton());
    expect(await quyTrinhUpdatePage.getSaveButton().isPresent()).to.be.false;

    await quyTrinhComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await quyTrinhComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last QuyTrinh', async () => {
    await quyTrinhComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await quyTrinhComponentsPage.countDeleteButtons();
    await quyTrinhComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    quyTrinhDeleteDialog = new QuyTrinhDeleteDialog();
    expect(await quyTrinhDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/gatewayApp.quanlyquytrinhQuyTrinh.delete.question/);
    await quyTrinhDeleteDialog.clickOnConfirmButton();

    await quyTrinhComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await quyTrinhComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
