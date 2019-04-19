/* tslint:disable no-unused-expression */
import { browser, element, by } from 'protractor';

import NavBarPage from './../../../page-objects/navbar-page';
import SignInPage from './../../../page-objects/signin-page';
import UyQuyenDuLieuComponentsPage from './uy-quyen-du-lieu.page-object';
import { UyQuyenDuLieuDeleteDialog } from './uy-quyen-du-lieu.page-object';
import UyQuyenDuLieuUpdatePage from './uy-quyen-du-lieu-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../../util/utils';

const expect = chai.expect;

describe('UyQuyenDuLieu e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let uyQuyenDuLieuUpdatePage: UyQuyenDuLieuUpdatePage;
  let uyQuyenDuLieuComponentsPage: UyQuyenDuLieuComponentsPage;
  let uyQuyenDuLieuDeleteDialog: UyQuyenDuLieuDeleteDialog;

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

  it('should load UyQuyenDuLieus', async () => {
    await navBarPage.getEntityPage('uy-quyen-du-lieu');
    uyQuyenDuLieuComponentsPage = new UyQuyenDuLieuComponentsPage();
    expect(await uyQuyenDuLieuComponentsPage.getTitle().getText()).to.match(/Uy Quyen Du Lieus/);
  });

  it('should load create UyQuyenDuLieu page', async () => {
    await uyQuyenDuLieuComponentsPage.clickOnCreateButton();
    uyQuyenDuLieuUpdatePage = new UyQuyenDuLieuUpdatePage();
    expect(await uyQuyenDuLieuUpdatePage.getPageTitle().getAttribute('id')).to.match(
      /gatewayApp.quytrinhdonviUyQuyenDuLieu.home.createOrEditLabel/
    );
  });

  it('should create and save UyQuyenDuLieus', async () => {
    const nbButtonsBeforeCreate = await uyQuyenDuLieuComponentsPage.countDeleteButtons();

    await uyQuyenDuLieuUpdatePage.setFromUserIdInput('fromUserId');
    expect(await uyQuyenDuLieuUpdatePage.getFromUserIdInput()).to.match(/fromUserId/);
    await uyQuyenDuLieuUpdatePage.setToUserIdInput('toUserId');
    expect(await uyQuyenDuLieuUpdatePage.getToUserIdInput()).to.match(/toUserId/);
    await uyQuyenDuLieuUpdatePage.setRoleInput('role');
    expect(await uyQuyenDuLieuUpdatePage.getRoleInput()).to.match(/role/);
    await uyQuyenDuLieuUpdatePage.duLieuTienTrinhSelectLastOption();
    await waitUntilDisplayed(uyQuyenDuLieuUpdatePage.getSaveButton());
    await uyQuyenDuLieuUpdatePage.save();
    await waitUntilHidden(uyQuyenDuLieuUpdatePage.getSaveButton());
    expect(await uyQuyenDuLieuUpdatePage.getSaveButton().isPresent()).to.be.false;

    await uyQuyenDuLieuComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await uyQuyenDuLieuComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last UyQuyenDuLieu', async () => {
    await uyQuyenDuLieuComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await uyQuyenDuLieuComponentsPage.countDeleteButtons();
    await uyQuyenDuLieuComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    uyQuyenDuLieuDeleteDialog = new UyQuyenDuLieuDeleteDialog();
    expect(await uyQuyenDuLieuDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /gatewayApp.quytrinhdonviUyQuyenDuLieu.delete.question/
    );
    await uyQuyenDuLieuDeleteDialog.clickOnConfirmButton();

    await uyQuyenDuLieuComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await uyQuyenDuLieuComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
