/* tslint:disable no-unused-expression */
import { browser, element, by, protractor } from 'protractor';

import NavBarPage from './../../../page-objects/navbar-page';
import SignInPage from './../../../page-objects/signin-page';
import TieuChiComponentsPage from './tieu-chi.page-object';
import { TieuChiDeleteDialog } from './tieu-chi.page-object';
import TieuChiUpdatePage from './tieu-chi-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../../util/utils';

const expect = chai.expect;

describe('TieuChi e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let tieuChiUpdatePage: TieuChiUpdatePage;
  let tieuChiComponentsPage: TieuChiComponentsPage;
  let tieuChiDeleteDialog: TieuChiDeleteDialog;

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

  it('should load TieuChis', async () => {
    await navBarPage.getEntityPage('tieu-chi');
    tieuChiComponentsPage = new TieuChiComponentsPage();
    expect(await tieuChiComponentsPage.getTitle().getText()).to.match(/Tieu Chis/);
  });

  it('should load create TieuChi page', async () => {
    await tieuChiComponentsPage.clickOnCreateButton();
    tieuChiUpdatePage = new TieuChiUpdatePage();
    expect(await tieuChiUpdatePage.getPageTitle().getAttribute('id')).to.match(/gatewayApp.donviphathanhTieuChi.home.createOrEditLabel/);
  });

  it('should create and save TieuChis', async () => {
    const nbButtonsBeforeCreate = await tieuChiComponentsPage.countDeleteButtons();

    await tieuChiUpdatePage.setTieuChiCodeInput('tieuChiCode');
    expect(await tieuChiUpdatePage.getTieuChiCodeInput()).to.match(/tieuChiCode/);
    await tieuChiUpdatePage.setNameInput('name');
    expect(await tieuChiUpdatePage.getNameInput()).to.match(/name/);
    await tieuChiUpdatePage.setUserNameInput('userName');
    expect(await tieuChiUpdatePage.getUserNameInput()).to.match(/userName/);
    await tieuChiUpdatePage.setCreateTimeInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await tieuChiUpdatePage.getCreateTimeInput()).to.contain('2001-01-01T02:30');
    await tieuChiUpdatePage.setUpdateTimeInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await tieuChiUpdatePage.getUpdateTimeInput()).to.contain('2001-01-01T02:30');
    await tieuChiUpdatePage.statusSelectLastOption();
    await tieuChiUpdatePage.setProgramInput('program');
    expect(await tieuChiUpdatePage.getProgramInput()).to.match(/program/);
    await tieuChiUpdatePage.kycongboSelectLastOption();
    await waitUntilDisplayed(tieuChiUpdatePage.getSaveButton());
    await tieuChiUpdatePage.save();
    await waitUntilHidden(tieuChiUpdatePage.getSaveButton());
    expect(await tieuChiUpdatePage.getSaveButton().isPresent()).to.be.false;

    await tieuChiComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await tieuChiComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last TieuChi', async () => {
    await tieuChiComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await tieuChiComponentsPage.countDeleteButtons();
    await tieuChiComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    tieuChiDeleteDialog = new TieuChiDeleteDialog();
    expect(await tieuChiDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/gatewayApp.donviphathanhTieuChi.delete.question/);
    await tieuChiDeleteDialog.clickOnConfirmButton();

    await tieuChiComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await tieuChiComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
