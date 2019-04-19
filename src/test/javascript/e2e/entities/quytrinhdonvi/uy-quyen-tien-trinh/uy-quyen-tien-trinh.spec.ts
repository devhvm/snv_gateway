/* tslint:disable no-unused-expression */
import { browser, element, by } from 'protractor';

import NavBarPage from './../../../page-objects/navbar-page';
import SignInPage from './../../../page-objects/signin-page';
import UyQuyenTienTrinhComponentsPage from './uy-quyen-tien-trinh.page-object';
import { UyQuyenTienTrinhDeleteDialog } from './uy-quyen-tien-trinh.page-object';
import UyQuyenTienTrinhUpdatePage from './uy-quyen-tien-trinh-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../../util/utils';

const expect = chai.expect;

describe('UyQuyenTienTrinh e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let uyQuyenTienTrinhUpdatePage: UyQuyenTienTrinhUpdatePage;
  let uyQuyenTienTrinhComponentsPage: UyQuyenTienTrinhComponentsPage;
  let uyQuyenTienTrinhDeleteDialog: UyQuyenTienTrinhDeleteDialog;

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

  it('should load UyQuyenTienTrinhs', async () => {
    await navBarPage.getEntityPage('uy-quyen-tien-trinh');
    uyQuyenTienTrinhComponentsPage = new UyQuyenTienTrinhComponentsPage();
    expect(await uyQuyenTienTrinhComponentsPage.getTitle().getText()).to.match(/Uy Quyen Tien Trinhs/);
  });

  it('should load create UyQuyenTienTrinh page', async () => {
    await uyQuyenTienTrinhComponentsPage.clickOnCreateButton();
    uyQuyenTienTrinhUpdatePage = new UyQuyenTienTrinhUpdatePage();
    expect(await uyQuyenTienTrinhUpdatePage.getPageTitle().getAttribute('id')).to.match(
      /gatewayApp.quytrinhdonviUyQuyenTienTrinh.home.createOrEditLabel/
    );
  });

  it('should create and save UyQuyenTienTrinhs', async () => {
    const nbButtonsBeforeCreate = await uyQuyenTienTrinhComponentsPage.countDeleteButtons();

    await uyQuyenTienTrinhUpdatePage.setTienTrinhCodeInput('tienTrinhCode');
    expect(await uyQuyenTienTrinhUpdatePage.getTienTrinhCodeInput()).to.match(/tienTrinhCode/);
    await uyQuyenTienTrinhUpdatePage.setFromUserIdInput('fromUserId');
    expect(await uyQuyenTienTrinhUpdatePage.getFromUserIdInput()).to.match(/fromUserId/);
    await uyQuyenTienTrinhUpdatePage.setToUserIdInput('toUserId');
    expect(await uyQuyenTienTrinhUpdatePage.getToUserIdInput()).to.match(/toUserId/);
    await uyQuyenTienTrinhUpdatePage.setRoleInput('role');
    expect(await uyQuyenTienTrinhUpdatePage.getRoleInput()).to.match(/role/);
    await uyQuyenTienTrinhUpdatePage.quyTrinhDonViSelectLastOption();
    await waitUntilDisplayed(uyQuyenTienTrinhUpdatePage.getSaveButton());
    await uyQuyenTienTrinhUpdatePage.save();
    await waitUntilHidden(uyQuyenTienTrinhUpdatePage.getSaveButton());
    expect(await uyQuyenTienTrinhUpdatePage.getSaveButton().isPresent()).to.be.false;

    await uyQuyenTienTrinhComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await uyQuyenTienTrinhComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last UyQuyenTienTrinh', async () => {
    await uyQuyenTienTrinhComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await uyQuyenTienTrinhComponentsPage.countDeleteButtons();
    await uyQuyenTienTrinhComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    uyQuyenTienTrinhDeleteDialog = new UyQuyenTienTrinhDeleteDialog();
    expect(await uyQuyenTienTrinhDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /gatewayApp.quytrinhdonviUyQuyenTienTrinh.delete.question/
    );
    await uyQuyenTienTrinhDeleteDialog.clickOnConfirmButton();

    await uyQuyenTienTrinhComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await uyQuyenTienTrinhComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
