/* tslint:disable no-unused-expression */
import { browser, element, by, protractor } from 'protractor';

import NavBarPage from './../../../page-objects/navbar-page';
import SignInPage from './../../../page-objects/signin-page';
import NhomChiTieuComponentsPage from './nhom-chi-tieu.page-object';
import { NhomChiTieuDeleteDialog } from './nhom-chi-tieu.page-object';
import NhomChiTieuUpdatePage from './nhom-chi-tieu-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../../util/utils';

const expect = chai.expect;

describe('NhomChiTieu e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let nhomChiTieuUpdatePage: NhomChiTieuUpdatePage;
  let nhomChiTieuComponentsPage: NhomChiTieuComponentsPage;
  let nhomChiTieuDeleteDialog: NhomChiTieuDeleteDialog;

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

  it('should load NhomChiTieus', async () => {
    await navBarPage.getEntityPage('nhom-chi-tieu');
    nhomChiTieuComponentsPage = new NhomChiTieuComponentsPage();
    expect(await nhomChiTieuComponentsPage.getTitle().getText()).to.match(/Nhom Chi Tieus/);
  });

  it('should load create NhomChiTieu page', async () => {
    await nhomChiTieuComponentsPage.clickOnCreateButton();
    nhomChiTieuUpdatePage = new NhomChiTieuUpdatePage();
    expect(await nhomChiTieuUpdatePage.getPageTitle().getAttribute('id')).to.match(/gatewayApp.commonNhomChiTieu.home.createOrEditLabel/);
  });

  it('should create and save NhomChiTieus', async () => {
    const nbButtonsBeforeCreate = await nhomChiTieuComponentsPage.countDeleteButtons();

    await nhomChiTieuUpdatePage.setNhomChiTieuCodeInput('nhomChiTieuCode');
    expect(await nhomChiTieuUpdatePage.getNhomChiTieuCodeInput()).to.match(/nhomChiTieuCode/);
    await nhomChiTieuUpdatePage.setNameInput('name');
    expect(await nhomChiTieuUpdatePage.getNameInput()).to.match(/name/);
    await nhomChiTieuUpdatePage.setUserNameInput('userName');
    expect(await nhomChiTieuUpdatePage.getUserNameInput()).to.match(/userName/);
    await nhomChiTieuUpdatePage.setCreateTimeInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await nhomChiTieuUpdatePage.getCreateTimeInput()).to.contain('2001-01-01T02:30');
    await nhomChiTieuUpdatePage.setUpdateTimeInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await nhomChiTieuUpdatePage.getUpdateTimeInput()).to.contain('2001-01-01T02:30');
    await nhomChiTieuUpdatePage.statusSelectLastOption();
    await nhomChiTieuUpdatePage.setProgramInput('program');
    expect(await nhomChiTieuUpdatePage.getProgramInput()).to.match(/program/);
    await waitUntilDisplayed(nhomChiTieuUpdatePage.getSaveButton());
    await nhomChiTieuUpdatePage.save();
    await waitUntilHidden(nhomChiTieuUpdatePage.getSaveButton());
    expect(await nhomChiTieuUpdatePage.getSaveButton().isPresent()).to.be.false;

    await nhomChiTieuComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await nhomChiTieuComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last NhomChiTieu', async () => {
    await nhomChiTieuComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await nhomChiTieuComponentsPage.countDeleteButtons();
    await nhomChiTieuComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    nhomChiTieuDeleteDialog = new NhomChiTieuDeleteDialog();
    expect(await nhomChiTieuDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/gatewayApp.commonNhomChiTieu.delete.question/);
    await nhomChiTieuDeleteDialog.clickOnConfirmButton();

    await nhomChiTieuComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await nhomChiTieuComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
