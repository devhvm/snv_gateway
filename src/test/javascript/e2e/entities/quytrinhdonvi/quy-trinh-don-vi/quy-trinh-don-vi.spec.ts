/* tslint:disable no-unused-expression */
import { browser, element, by } from 'protractor';

import NavBarPage from './../../../page-objects/navbar-page';
import SignInPage from './../../../page-objects/signin-page';
import QuyTrinhDonViComponentsPage from './quy-trinh-don-vi.page-object';
import { QuyTrinhDonViDeleteDialog } from './quy-trinh-don-vi.page-object';
import QuyTrinhDonViUpdatePage from './quy-trinh-don-vi-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../../util/utils';

const expect = chai.expect;

describe('QuyTrinhDonVi e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let quyTrinhDonViUpdatePage: QuyTrinhDonViUpdatePage;
  let quyTrinhDonViComponentsPage: QuyTrinhDonViComponentsPage;
  let quyTrinhDonViDeleteDialog: QuyTrinhDonViDeleteDialog;

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

  it('should load QuyTrinhDonVis', async () => {
    await navBarPage.getEntityPage('quy-trinh-don-vi');
    quyTrinhDonViComponentsPage = new QuyTrinhDonViComponentsPage();
    expect(await quyTrinhDonViComponentsPage.getTitle().getText()).to.match(/Quy Trinh Don Vis/);
  });

  it('should load create QuyTrinhDonVi page', async () => {
    await quyTrinhDonViComponentsPage.clickOnCreateButton();
    quyTrinhDonViUpdatePage = new QuyTrinhDonViUpdatePage();
    expect(await quyTrinhDonViUpdatePage.getPageTitle().getAttribute('id')).to.match(
      /gatewayApp.quytrinhdonviQuyTrinhDonVi.home.createOrEditLabel/
    );
  });

  it('should create and save QuyTrinhDonVis', async () => {
    const nbButtonsBeforeCreate = await quyTrinhDonViComponentsPage.countDeleteButtons();

    await quyTrinhDonViUpdatePage.setQuyTrinhCodeInput('quyTrinhCode');
    expect(await quyTrinhDonViUpdatePage.getQuyTrinhCodeInput()).to.match(/quyTrinhCode/);
    await quyTrinhDonViUpdatePage.setNameInput('name');
    expect(await quyTrinhDonViUpdatePage.getNameInput()).to.match(/name/);
    await quyTrinhDonViUpdatePage.coQuanHanhChinhSelectLastOption();
    await waitUntilDisplayed(quyTrinhDonViUpdatePage.getSaveButton());
    await quyTrinhDonViUpdatePage.save();
    await waitUntilHidden(quyTrinhDonViUpdatePage.getSaveButton());
    expect(await quyTrinhDonViUpdatePage.getSaveButton().isPresent()).to.be.false;

    await quyTrinhDonViComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await quyTrinhDonViComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last QuyTrinhDonVi', async () => {
    await quyTrinhDonViComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await quyTrinhDonViComponentsPage.countDeleteButtons();
    await quyTrinhDonViComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    quyTrinhDonViDeleteDialog = new QuyTrinhDonViDeleteDialog();
    expect(await quyTrinhDonViDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /gatewayApp.quytrinhdonviQuyTrinhDonVi.delete.question/
    );
    await quyTrinhDonViDeleteDialog.clickOnConfirmButton();

    await quyTrinhDonViComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await quyTrinhDonViComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
