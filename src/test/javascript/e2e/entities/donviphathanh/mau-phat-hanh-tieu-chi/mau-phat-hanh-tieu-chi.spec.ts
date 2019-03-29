/* tslint:disable no-unused-expression */
import { browser, element, by } from 'protractor';

import NavBarPage from './../../../page-objects/navbar-page';
import SignInPage from './../../../page-objects/signin-page';
import MauPhatHanhTieuChiComponentsPage from './mau-phat-hanh-tieu-chi.page-object';
import { MauPhatHanhTieuChiDeleteDialog } from './mau-phat-hanh-tieu-chi.page-object';
import MauPhatHanhTieuChiUpdatePage from './mau-phat-hanh-tieu-chi-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../../util/utils';

const expect = chai.expect;

describe('MauPhatHanhTieuChi e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let mauPhatHanhTieuChiUpdatePage: MauPhatHanhTieuChiUpdatePage;
  let mauPhatHanhTieuChiComponentsPage: MauPhatHanhTieuChiComponentsPage;
  let mauPhatHanhTieuChiDeleteDialog: MauPhatHanhTieuChiDeleteDialog;

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

  it('should load MauPhatHanhTieuChis', async () => {
    await navBarPage.getEntityPage('mau-phat-hanh-tieu-chi');
    mauPhatHanhTieuChiComponentsPage = new MauPhatHanhTieuChiComponentsPage();
    expect(await mauPhatHanhTieuChiComponentsPage.getTitle().getText()).to.match(/Mau Phat Hanh Tieu Chis/);
  });

  it('should load create MauPhatHanhTieuChi page', async () => {
    await mauPhatHanhTieuChiComponentsPage.clickOnCreateButton();
    mauPhatHanhTieuChiUpdatePage = new MauPhatHanhTieuChiUpdatePage();
    expect(await mauPhatHanhTieuChiUpdatePage.getPageTitle().getAttribute('id')).to.match(
      /gatewayApp.donviphathanhMauPhatHanhTieuChi.home.createOrEditLabel/
    );
  });

  it('should create and save MauPhatHanhTieuChis', async () => {
    const nbButtonsBeforeCreate = await mauPhatHanhTieuChiComponentsPage.countDeleteButtons();

    await mauPhatHanhTieuChiUpdatePage.tieuchiSelectLastOption();
    await mauPhatHanhTieuChiUpdatePage.mauphathanhSelectLastOption();
    await waitUntilDisplayed(mauPhatHanhTieuChiUpdatePage.getSaveButton());
    await mauPhatHanhTieuChiUpdatePage.save();
    await waitUntilHidden(mauPhatHanhTieuChiUpdatePage.getSaveButton());
    expect(await mauPhatHanhTieuChiUpdatePage.getSaveButton().isPresent()).to.be.false;

    await mauPhatHanhTieuChiComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await mauPhatHanhTieuChiComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last MauPhatHanhTieuChi', async () => {
    await mauPhatHanhTieuChiComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await mauPhatHanhTieuChiComponentsPage.countDeleteButtons();
    await mauPhatHanhTieuChiComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    mauPhatHanhTieuChiDeleteDialog = new MauPhatHanhTieuChiDeleteDialog();
    expect(await mauPhatHanhTieuChiDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /gatewayApp.donviphathanhMauPhatHanhTieuChi.delete.question/
    );
    await mauPhatHanhTieuChiDeleteDialog.clickOnConfirmButton();

    await mauPhatHanhTieuChiComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await mauPhatHanhTieuChiComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
