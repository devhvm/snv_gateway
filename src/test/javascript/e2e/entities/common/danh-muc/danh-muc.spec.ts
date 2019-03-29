/* tslint:disable no-unused-expression */
import { browser, element, by, protractor } from 'protractor';

import NavBarPage from './../../../page-objects/navbar-page';
import SignInPage from './../../../page-objects/signin-page';
import DanhMucComponentsPage from './danh-muc.page-object';
import { DanhMucDeleteDialog } from './danh-muc.page-object';
import DanhMucUpdatePage from './danh-muc-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../../util/utils';

const expect = chai.expect;

describe('DanhMuc e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let danhMucUpdatePage: DanhMucUpdatePage;
  let danhMucComponentsPage: DanhMucComponentsPage;
  let danhMucDeleteDialog: DanhMucDeleteDialog;

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

  it('should load DanhMucs', async () => {
    await navBarPage.getEntityPage('danh-muc');
    danhMucComponentsPage = new DanhMucComponentsPage();
    expect(await danhMucComponentsPage.getTitle().getText()).to.match(/Danh Mucs/);
  });

  it('should load create DanhMuc page', async () => {
    await danhMucComponentsPage.clickOnCreateButton();
    danhMucUpdatePage = new DanhMucUpdatePage();
    expect(await danhMucUpdatePage.getPageTitle().getAttribute('id')).to.match(/gatewayApp.commonDanhMuc.home.createOrEditLabel/);
  });

  it('should create and save DanhMucs', async () => {
    const nbButtonsBeforeCreate = await danhMucComponentsPage.countDeleteButtons();

    await danhMucUpdatePage.setDanhMucCodeInput('danhMucCode');
    expect(await danhMucUpdatePage.getDanhMucCodeInput()).to.match(/danhMucCode/);
    await danhMucUpdatePage.setNameInput('name');
    expect(await danhMucUpdatePage.getNameInput()).to.match(/name/);
    await danhMucUpdatePage.setUserNameInput('userName');
    expect(await danhMucUpdatePage.getUserNameInput()).to.match(/userName/);
    await danhMucUpdatePage.setCreateTimeInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await danhMucUpdatePage.getCreateTimeInput()).to.contain('2001-01-01T02:30');
    await danhMucUpdatePage.setUpdateTimeInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await danhMucUpdatePage.getUpdateTimeInput()).to.contain('2001-01-01T02:30');
    await danhMucUpdatePage.statusSelectLastOption();
    await danhMucUpdatePage.setProgramInput('program');
    expect(await danhMucUpdatePage.getProgramInput()).to.match(/program/);
    await waitUntilDisplayed(danhMucUpdatePage.getSaveButton());
    await danhMucUpdatePage.save();
    await waitUntilHidden(danhMucUpdatePage.getSaveButton());
    expect(await danhMucUpdatePage.getSaveButton().isPresent()).to.be.false;

    await danhMucComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await danhMucComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last DanhMuc', async () => {
    await danhMucComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await danhMucComponentsPage.countDeleteButtons();
    await danhMucComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    danhMucDeleteDialog = new DanhMucDeleteDialog();
    expect(await danhMucDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/gatewayApp.commonDanhMuc.delete.question/);
    await danhMucDeleteDialog.clickOnConfirmButton();

    await danhMucComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await danhMucComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
