/* tslint:disable no-unused-expression */
import { browser, element, by } from 'protractor';

import NavBarPage from './../../../page-objects/navbar-page';
import SignInPage from './../../../page-objects/signin-page';
import ChiTieuComponentsPage from './chi-tieu.page-object';
import { ChiTieuDeleteDialog } from './chi-tieu.page-object';
import ChiTieuUpdatePage from './chi-tieu-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../../util/utils';

const expect = chai.expect;

describe('ChiTieu e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let chiTieuUpdatePage: ChiTieuUpdatePage;
  let chiTieuComponentsPage: ChiTieuComponentsPage;
  let chiTieuDeleteDialog: ChiTieuDeleteDialog;

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

  it('should load ChiTieus', async () => {
    await navBarPage.getEntityPage('chi-tieu');
    chiTieuComponentsPage = new ChiTieuComponentsPage();
    expect(await chiTieuComponentsPage.getTitle().getText()).to.match(/Chi Tieus/);
  });

  it('should load create ChiTieu page', async () => {
    await chiTieuComponentsPage.clickOnCreateButton();
    chiTieuUpdatePage = new ChiTieuUpdatePage();
    expect(await chiTieuUpdatePage.getPageTitle().getAttribute('id')).to.match(/gatewayApp.commonChiTieu.home.createOrEditLabel/);
  });

  it('should create and save ChiTieus', async () => {
    const nbButtonsBeforeCreate = await chiTieuComponentsPage.countDeleteButtons();

    await chiTieuUpdatePage.setChiTieuCodeInput('chiTieuCode');
    expect(await chiTieuUpdatePage.getChiTieuCodeInput()).to.match(/chiTieuCode/);
    await chiTieuUpdatePage.setNameInput('name');
    expect(await chiTieuUpdatePage.getNameInput()).to.match(/name/);
    await chiTieuUpdatePage.statusSelectLastOption();
    await chiTieuUpdatePage.nhomchitieuSelectLastOption();
    await waitUntilDisplayed(chiTieuUpdatePage.getSaveButton());
    await chiTieuUpdatePage.save();
    await waitUntilHidden(chiTieuUpdatePage.getSaveButton());
    expect(await chiTieuUpdatePage.getSaveButton().isPresent()).to.be.false;

    await chiTieuComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await chiTieuComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last ChiTieu', async () => {
    await chiTieuComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await chiTieuComponentsPage.countDeleteButtons();
    await chiTieuComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    chiTieuDeleteDialog = new ChiTieuDeleteDialog();
    expect(await chiTieuDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/gatewayApp.commonChiTieu.delete.question/);
    await chiTieuDeleteDialog.clickOnConfirmButton();

    await chiTieuComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await chiTieuComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
