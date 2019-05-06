/* tslint:disable no-unused-expression */
import { browser, element, by } from 'protractor';

import NavBarPage from './../../../page-objects/navbar-page';
import SignInPage from './../../../page-objects/signin-page';
import TienTrinhComponentsPage from './tien-trinh.page-object';
import { TienTrinhDeleteDialog } from './tien-trinh.page-object';
import TienTrinhUpdatePage from './tien-trinh-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../../util/utils';

const expect = chai.expect;

describe('TienTrinh e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let tienTrinhUpdatePage: TienTrinhUpdatePage;
  let tienTrinhComponentsPage: TienTrinhComponentsPage;
  let tienTrinhDeleteDialog: TienTrinhDeleteDialog;

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

  it('should load TienTrinhs', async () => {
    await navBarPage.getEntityPage('tien-trinh');
    tienTrinhComponentsPage = new TienTrinhComponentsPage();
    expect(await tienTrinhComponentsPage.getTitle().getText()).to.match(/Tien Trinhs/);
  });

  it('should load create TienTrinh page', async () => {
    await tienTrinhComponentsPage.clickOnCreateButton();
    tienTrinhUpdatePage = new TienTrinhUpdatePage();
    expect(await tienTrinhUpdatePage.getPageTitle().getAttribute('id')).to.match(
      /gatewayApp.quanlyquytrinhTienTrinh.home.createOrEditLabel/
    );
  });

  it('should create and save TienTrinhs', async () => {
    const nbButtonsBeforeCreate = await tienTrinhComponentsPage.countDeleteButtons();

    await tienTrinhUpdatePage.setTienTrinhCodeInput('tienTrinhCode');
    expect(await tienTrinhUpdatePage.getTienTrinhCodeInput()).to.match(/tienTrinhCode/);
    await tienTrinhUpdatePage.setNameInput('name');
    expect(await tienTrinhUpdatePage.getNameInput()).to.match(/name/);
    await tienTrinhUpdatePage.setScreenCodeInput('screenCode');
    expect(await tienTrinhUpdatePage.getScreenCodeInput()).to.match(/screenCode/);
    await tienTrinhUpdatePage.setStatusInput('status');
    expect(await tienTrinhUpdatePage.getStatusInput()).to.match(/status/);
    await tienTrinhUpdatePage.quyTrinhSelectLastOption();
    await waitUntilDisplayed(tienTrinhUpdatePage.getSaveButton());
    await tienTrinhUpdatePage.save();
    await waitUntilHidden(tienTrinhUpdatePage.getSaveButton());
    expect(await tienTrinhUpdatePage.getSaveButton().isPresent()).to.be.false;

    await tienTrinhComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await tienTrinhComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last TienTrinh', async () => {
    await tienTrinhComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await tienTrinhComponentsPage.countDeleteButtons();
    await tienTrinhComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    tienTrinhDeleteDialog = new TienTrinhDeleteDialog();
    expect(await tienTrinhDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/gatewayApp.quanlyquytrinhTienTrinh.delete.question/);
    await tienTrinhDeleteDialog.clickOnConfirmButton();

    await tienTrinhComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await tienTrinhComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
