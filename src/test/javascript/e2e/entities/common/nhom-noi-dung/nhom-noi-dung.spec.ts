/* tslint:disable no-unused-expression */
import { browser, element, by, protractor } from 'protractor';

import NavBarPage from './../../../page-objects/navbar-page';
import SignInPage from './../../../page-objects/signin-page';
import NhomNoiDungComponentsPage from './nhom-noi-dung.page-object';
import { NhomNoiDungDeleteDialog } from './nhom-noi-dung.page-object';
import NhomNoiDungUpdatePage from './nhom-noi-dung-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../../util/utils';

const expect = chai.expect;

describe('NhomNoiDung e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let nhomNoiDungUpdatePage: NhomNoiDungUpdatePage;
  let nhomNoiDungComponentsPage: NhomNoiDungComponentsPage;
  let nhomNoiDungDeleteDialog: NhomNoiDungDeleteDialog;

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

  it('should load NhomNoiDungs', async () => {
    await navBarPage.getEntityPage('nhom-noi-dung');
    nhomNoiDungComponentsPage = new NhomNoiDungComponentsPage();
    expect(await nhomNoiDungComponentsPage.getTitle().getText()).to.match(/Nhom Noi Dungs/);
  });

  it('should load create NhomNoiDung page', async () => {
    await nhomNoiDungComponentsPage.clickOnCreateButton();
    nhomNoiDungUpdatePage = new NhomNoiDungUpdatePage();
    expect(await nhomNoiDungUpdatePage.getPageTitle().getAttribute('id')).to.match(/gatewayApp.commonNhomNoiDung.home.createOrEditLabel/);
  });

  it('should create and save NhomNoiDungs', async () => {
    const nbButtonsBeforeCreate = await nhomNoiDungComponentsPage.countDeleteButtons();

    await nhomNoiDungUpdatePage.setNhomNoiDungCodeInput('nhomNoiDungCode');
    expect(await nhomNoiDungUpdatePage.getNhomNoiDungCodeInput()).to.match(/nhomNoiDungCode/);
    await nhomNoiDungUpdatePage.setNameInput('name');
    expect(await nhomNoiDungUpdatePage.getNameInput()).to.match(/name/);
    await nhomNoiDungUpdatePage.setUserNameInput('userName');
    expect(await nhomNoiDungUpdatePage.getUserNameInput()).to.match(/userName/);
    await nhomNoiDungUpdatePage.setCreateTimeInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await nhomNoiDungUpdatePage.getCreateTimeInput()).to.contain('2001-01-01T02:30');
    await nhomNoiDungUpdatePage.setUpdateTimeInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await nhomNoiDungUpdatePage.getUpdateTimeInput()).to.contain('2001-01-01T02:30');
    await nhomNoiDungUpdatePage.statusSelectLastOption();
    await nhomNoiDungUpdatePage.setProgramInput('program');
    expect(await nhomNoiDungUpdatePage.getProgramInput()).to.match(/program/);
    await waitUntilDisplayed(nhomNoiDungUpdatePage.getSaveButton());
    await nhomNoiDungUpdatePage.save();
    await waitUntilHidden(nhomNoiDungUpdatePage.getSaveButton());
    expect(await nhomNoiDungUpdatePage.getSaveButton().isPresent()).to.be.false;

    await nhomNoiDungComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await nhomNoiDungComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last NhomNoiDung', async () => {
    await nhomNoiDungComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await nhomNoiDungComponentsPage.countDeleteButtons();
    await nhomNoiDungComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    nhomNoiDungDeleteDialog = new NhomNoiDungDeleteDialog();
    expect(await nhomNoiDungDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/gatewayApp.commonNhomNoiDung.delete.question/);
    await nhomNoiDungDeleteDialog.clickOnConfirmButton();

    await nhomNoiDungComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await nhomNoiDungComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
