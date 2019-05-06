/* tslint:disable no-unused-expression */
import { browser, element, by } from 'protractor';

import NavBarPage from './../../../page-objects/navbar-page';
import SignInPage from './../../../page-objects/signin-page';
import LoaiQuyTrinhComponentsPage from './loai-quy-trinh.page-object';
import { LoaiQuyTrinhDeleteDialog } from './loai-quy-trinh.page-object';
import LoaiQuyTrinhUpdatePage from './loai-quy-trinh-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../../util/utils';

const expect = chai.expect;

describe('LoaiQuyTrinh e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let loaiQuyTrinhUpdatePage: LoaiQuyTrinhUpdatePage;
  let loaiQuyTrinhComponentsPage: LoaiQuyTrinhComponentsPage;
  let loaiQuyTrinhDeleteDialog: LoaiQuyTrinhDeleteDialog;

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

  it('should load LoaiQuyTrinhs', async () => {
    await navBarPage.getEntityPage('loai-quy-trinh');
    loaiQuyTrinhComponentsPage = new LoaiQuyTrinhComponentsPage();
    expect(await loaiQuyTrinhComponentsPage.getTitle().getText()).to.match(/Loai Quy Trinhs/);
  });

  it('should load create LoaiQuyTrinh page', async () => {
    await loaiQuyTrinhComponentsPage.clickOnCreateButton();
    loaiQuyTrinhUpdatePage = new LoaiQuyTrinhUpdatePage();
    expect(await loaiQuyTrinhUpdatePage.getPageTitle().getAttribute('id')).to.match(
      /gatewayApp.quanlyquytrinhLoaiQuyTrinh.home.createOrEditLabel/
    );
  });

  it('should create and save LoaiQuyTrinhs', async () => {
    const nbButtonsBeforeCreate = await loaiQuyTrinhComponentsPage.countDeleteButtons();

    await loaiQuyTrinhUpdatePage.setLoaiQuyTrinhCodeInput('loaiQuyTrinhCode');
    expect(await loaiQuyTrinhUpdatePage.getLoaiQuyTrinhCodeInput()).to.match(/loaiQuyTrinhCode/);
    await loaiQuyTrinhUpdatePage.setMethodNameInput('methodName');
    expect(await loaiQuyTrinhUpdatePage.getMethodNameInput()).to.match(/methodName/);
    await loaiQuyTrinhUpdatePage.setEntityNameInput('entityName');
    expect(await loaiQuyTrinhUpdatePage.getEntityNameInput()).to.match(/entityName/);
    await loaiQuyTrinhUpdatePage.setServiceNameInput('serviceName');
    expect(await loaiQuyTrinhUpdatePage.getServiceNameInput()).to.match(/serviceName/);
    await waitUntilDisplayed(loaiQuyTrinhUpdatePage.getSaveButton());
    await loaiQuyTrinhUpdatePage.save();
    await waitUntilHidden(loaiQuyTrinhUpdatePage.getSaveButton());
    expect(await loaiQuyTrinhUpdatePage.getSaveButton().isPresent()).to.be.false;

    await loaiQuyTrinhComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await loaiQuyTrinhComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last LoaiQuyTrinh', async () => {
    await loaiQuyTrinhComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await loaiQuyTrinhComponentsPage.countDeleteButtons();
    await loaiQuyTrinhComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    loaiQuyTrinhDeleteDialog = new LoaiQuyTrinhDeleteDialog();
    expect(await loaiQuyTrinhDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /gatewayApp.quanlyquytrinhLoaiQuyTrinh.delete.question/
    );
    await loaiQuyTrinhDeleteDialog.clickOnConfirmButton();

    await loaiQuyTrinhComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await loaiQuyTrinhComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
