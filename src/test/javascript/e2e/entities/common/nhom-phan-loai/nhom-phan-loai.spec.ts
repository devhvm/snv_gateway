/* tslint:disable no-unused-expression */
import { browser, element, by, protractor } from 'protractor';

import NavBarPage from './../../../page-objects/navbar-page';
import SignInPage from './../../../page-objects/signin-page';
import NhomPhanLoaiComponentsPage from './nhom-phan-loai.page-object';
import { NhomPhanLoaiDeleteDialog } from './nhom-phan-loai.page-object';
import NhomPhanLoaiUpdatePage from './nhom-phan-loai-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../../util/utils';

const expect = chai.expect;

describe('NhomPhanLoai e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let nhomPhanLoaiUpdatePage: NhomPhanLoaiUpdatePage;
  let nhomPhanLoaiComponentsPage: NhomPhanLoaiComponentsPage;
  let nhomPhanLoaiDeleteDialog: NhomPhanLoaiDeleteDialog;

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

  it('should load NhomPhanLoais', async () => {
    await navBarPage.getEntityPage('nhom-phan-loai');
    nhomPhanLoaiComponentsPage = new NhomPhanLoaiComponentsPage();
    expect(await nhomPhanLoaiComponentsPage.getTitle().getText()).to.match(/Nhom Phan Loais/);
  });

  it('should load create NhomPhanLoai page', async () => {
    await nhomPhanLoaiComponentsPage.clickOnCreateButton();
    nhomPhanLoaiUpdatePage = new NhomPhanLoaiUpdatePage();
    expect(await nhomPhanLoaiUpdatePage.getPageTitle().getAttribute('id')).to.match(/gatewayApp.commonNhomPhanLoai.home.createOrEditLabel/);
  });

  it('should create and save NhomPhanLoais', async () => {
    const nbButtonsBeforeCreate = await nhomPhanLoaiComponentsPage.countDeleteButtons();

    await nhomPhanLoaiUpdatePage.setNhomPhanLoaiCodeInput('nhomPhanLoaiCode');
    expect(await nhomPhanLoaiUpdatePage.getNhomPhanLoaiCodeInput()).to.match(/nhomPhanLoaiCode/);
    await nhomPhanLoaiUpdatePage.setNameInput('name');
    expect(await nhomPhanLoaiUpdatePage.getNameInput()).to.match(/name/);
    await nhomPhanLoaiUpdatePage.setUserNameInput('userName');
    expect(await nhomPhanLoaiUpdatePage.getUserNameInput()).to.match(/userName/);
    await nhomPhanLoaiUpdatePage.setCreateTimeInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await nhomPhanLoaiUpdatePage.getCreateTimeInput()).to.contain('2001-01-01T02:30');
    await nhomPhanLoaiUpdatePage.setUpdateTimeInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await nhomPhanLoaiUpdatePage.getUpdateTimeInput()).to.contain('2001-01-01T02:30');
    await nhomPhanLoaiUpdatePage.statusSelectLastOption();
    await nhomPhanLoaiUpdatePage.setProgramInput('program');
    expect(await nhomPhanLoaiUpdatePage.getProgramInput()).to.match(/program/);
    await nhomPhanLoaiUpdatePage.donviSelectLastOption();
    await waitUntilDisplayed(nhomPhanLoaiUpdatePage.getSaveButton());
    await nhomPhanLoaiUpdatePage.save();
    await waitUntilHidden(nhomPhanLoaiUpdatePage.getSaveButton());
    expect(await nhomPhanLoaiUpdatePage.getSaveButton().isPresent()).to.be.false;

    await nhomPhanLoaiComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await nhomPhanLoaiComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last NhomPhanLoai', async () => {
    await nhomPhanLoaiComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await nhomPhanLoaiComponentsPage.countDeleteButtons();
    await nhomPhanLoaiComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    nhomPhanLoaiDeleteDialog = new NhomPhanLoaiDeleteDialog();
    expect(await nhomPhanLoaiDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/gatewayApp.commonNhomPhanLoai.delete.question/);
    await nhomPhanLoaiDeleteDialog.clickOnConfirmButton();

    await nhomPhanLoaiComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await nhomPhanLoaiComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
