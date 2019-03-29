/* tslint:disable no-unused-expression */
import { browser, element, by, protractor } from 'protractor';

import NavBarPage from './../../../page-objects/navbar-page';
import SignInPage from './../../../page-objects/signin-page';
import NhomDanhMucComponentsPage from './nhom-danh-muc.page-object';
import { NhomDanhMucDeleteDialog } from './nhom-danh-muc.page-object';
import NhomDanhMucUpdatePage from './nhom-danh-muc-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../../util/utils';

const expect = chai.expect;

describe('NhomDanhMuc e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let nhomDanhMucUpdatePage: NhomDanhMucUpdatePage;
  let nhomDanhMucComponentsPage: NhomDanhMucComponentsPage;
  let nhomDanhMucDeleteDialog: NhomDanhMucDeleteDialog;

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

  it('should load NhomDanhMucs', async () => {
    await navBarPage.getEntityPage('nhom-danh-muc');
    nhomDanhMucComponentsPage = new NhomDanhMucComponentsPage();
    expect(await nhomDanhMucComponentsPage.getTitle().getText()).to.match(/Nhom Danh Mucs/);
  });

  it('should load create NhomDanhMuc page', async () => {
    await nhomDanhMucComponentsPage.clickOnCreateButton();
    nhomDanhMucUpdatePage = new NhomDanhMucUpdatePage();
    expect(await nhomDanhMucUpdatePage.getPageTitle().getAttribute('id')).to.match(/gatewayApp.commonNhomDanhMuc.home.createOrEditLabel/);
  });

  it('should create and save NhomDanhMucs', async () => {
    const nbButtonsBeforeCreate = await nhomDanhMucComponentsPage.countDeleteButtons();

    await nhomDanhMucUpdatePage.setNhomDanhMucCodeInput('nhomDanhMucCode');
    expect(await nhomDanhMucUpdatePage.getNhomDanhMucCodeInput()).to.match(/nhomDanhMucCode/);
    await nhomDanhMucUpdatePage.setNameInput('name');
    expect(await nhomDanhMucUpdatePage.getNameInput()).to.match(/name/);
    await nhomDanhMucUpdatePage.setUserNameInput('userName');
    expect(await nhomDanhMucUpdatePage.getUserNameInput()).to.match(/userName/);
    await nhomDanhMucUpdatePage.setCreateTimeInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await nhomDanhMucUpdatePage.getCreateTimeInput()).to.contain('2001-01-01T02:30');
    await nhomDanhMucUpdatePage.setUpdateTimeInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await nhomDanhMucUpdatePage.getUpdateTimeInput()).to.contain('2001-01-01T02:30');
    await nhomDanhMucUpdatePage.statusSelectLastOption();
    await nhomDanhMucUpdatePage.setProgramInput('program');
    expect(await nhomDanhMucUpdatePage.getProgramInput()).to.match(/program/);
    await waitUntilDisplayed(nhomDanhMucUpdatePage.getSaveButton());
    await nhomDanhMucUpdatePage.save();
    await waitUntilHidden(nhomDanhMucUpdatePage.getSaveButton());
    expect(await nhomDanhMucUpdatePage.getSaveButton().isPresent()).to.be.false;

    await nhomDanhMucComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await nhomDanhMucComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last NhomDanhMuc', async () => {
    await nhomDanhMucComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await nhomDanhMucComponentsPage.countDeleteButtons();
    await nhomDanhMucComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    nhomDanhMucDeleteDialog = new NhomDanhMucDeleteDialog();
    expect(await nhomDanhMucDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/gatewayApp.commonNhomDanhMuc.delete.question/);
    await nhomDanhMucDeleteDialog.clickOnConfirmButton();

    await nhomDanhMucComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await nhomDanhMucComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
