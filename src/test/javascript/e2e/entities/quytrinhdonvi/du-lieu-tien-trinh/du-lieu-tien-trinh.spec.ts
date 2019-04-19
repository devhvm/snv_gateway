/* tslint:disable no-unused-expression */
import { browser, element, by } from 'protractor';

import NavBarPage from './../../../page-objects/navbar-page';
import SignInPage from './../../../page-objects/signin-page';
import DuLieuTienTrinhComponentsPage from './du-lieu-tien-trinh.page-object';
import { DuLieuTienTrinhDeleteDialog } from './du-lieu-tien-trinh.page-object';
import DuLieuTienTrinhUpdatePage from './du-lieu-tien-trinh-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../../util/utils';

const expect = chai.expect;

describe('DuLieuTienTrinh e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let duLieuTienTrinhUpdatePage: DuLieuTienTrinhUpdatePage;
  let duLieuTienTrinhComponentsPage: DuLieuTienTrinhComponentsPage;
  let duLieuTienTrinhDeleteDialog: DuLieuTienTrinhDeleteDialog;

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

  it('should load DuLieuTienTrinhs', async () => {
    await navBarPage.getEntityPage('du-lieu-tien-trinh');
    duLieuTienTrinhComponentsPage = new DuLieuTienTrinhComponentsPage();
    expect(await duLieuTienTrinhComponentsPage.getTitle().getText()).to.match(/Du Lieu Tien Trinhs/);
  });

  it('should load create DuLieuTienTrinh page', async () => {
    await duLieuTienTrinhComponentsPage.clickOnCreateButton();
    duLieuTienTrinhUpdatePage = new DuLieuTienTrinhUpdatePage();
    expect(await duLieuTienTrinhUpdatePage.getPageTitle().getAttribute('id')).to.match(
      /gatewayApp.quytrinhdonviDuLieuTienTrinh.home.createOrEditLabel/
    );
  });

  it('should create and save DuLieuTienTrinhs', async () => {
    const nbButtonsBeforeCreate = await duLieuTienTrinhComponentsPage.countDeleteButtons();

    await duLieuTienTrinhUpdatePage.setTienTrinhCodeInput('tienTrinhCode');
    expect(await duLieuTienTrinhUpdatePage.getTienTrinhCodeInput()).to.match(/tienTrinhCode/);
    await duLieuTienTrinhUpdatePage.setDuLieuCodeInput('duLieuCode');
    expect(await duLieuTienTrinhUpdatePage.getDuLieuCodeInput()).to.match(/duLieuCode/);
    await duLieuTienTrinhUpdatePage.setFromUserIdInput('fromUserId');
    expect(await duLieuTienTrinhUpdatePage.getFromUserIdInput()).to.match(/fromUserId/);
    await duLieuTienTrinhUpdatePage.setToUserIdInput('toUserId');
    expect(await duLieuTienTrinhUpdatePage.getToUserIdInput()).to.match(/toUserId/);
    await duLieuTienTrinhUpdatePage.setLevelInput('level');
    expect(await duLieuTienTrinhUpdatePage.getLevelInput()).to.match(/level/);
    await duLieuTienTrinhUpdatePage.setNoteInput('note');
    expect(await duLieuTienTrinhUpdatePage.getNoteInput()).to.match(/note/);
    await duLieuTienTrinhUpdatePage.quyTrinhDonViSelectLastOption();
    await waitUntilDisplayed(duLieuTienTrinhUpdatePage.getSaveButton());
    await duLieuTienTrinhUpdatePage.save();
    await waitUntilHidden(duLieuTienTrinhUpdatePage.getSaveButton());
    expect(await duLieuTienTrinhUpdatePage.getSaveButton().isPresent()).to.be.false;

    await duLieuTienTrinhComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await duLieuTienTrinhComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last DuLieuTienTrinh', async () => {
    await duLieuTienTrinhComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await duLieuTienTrinhComponentsPage.countDeleteButtons();
    await duLieuTienTrinhComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    duLieuTienTrinhDeleteDialog = new DuLieuTienTrinhDeleteDialog();
    expect(await duLieuTienTrinhDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /gatewayApp.quytrinhdonviDuLieuTienTrinh.delete.question/
    );
    await duLieuTienTrinhDeleteDialog.clickOnConfirmButton();

    await duLieuTienTrinhComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await duLieuTienTrinhComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
