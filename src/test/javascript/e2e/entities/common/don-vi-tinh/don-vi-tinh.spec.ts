/* tslint:disable no-unused-expression */
import { browser, element, by } from 'protractor';

import NavBarPage from './../../../page-objects/navbar-page';
import SignInPage from './../../../page-objects/signin-page';
import DonViTinhComponentsPage from './don-vi-tinh.page-object';
import { DonViTinhDeleteDialog } from './don-vi-tinh.page-object';
import DonViTinhUpdatePage from './don-vi-tinh-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../../util/utils';

const expect = chai.expect;

describe('DonViTinh e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let donViTinhUpdatePage: DonViTinhUpdatePage;
  let donViTinhComponentsPage: DonViTinhComponentsPage;
  let donViTinhDeleteDialog: DonViTinhDeleteDialog;

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

  it('should load DonViTinhs', async () => {
    await navBarPage.getEntityPage('don-vi-tinh');
    donViTinhComponentsPage = new DonViTinhComponentsPage();
    expect(await donViTinhComponentsPage.getTitle().getText()).to.match(/Don Vi Tinhs/);
  });

  it('should load create DonViTinh page', async () => {
    await donViTinhComponentsPage.clickOnCreateButton();
    donViTinhUpdatePage = new DonViTinhUpdatePage();
    expect(await donViTinhUpdatePage.getPageTitle().getAttribute('id')).to.match(/gatewayApp.commonDonViTinh.home.createOrEditLabel/);
  });

  it('should create and save DonViTinhs', async () => {
    const nbButtonsBeforeCreate = await donViTinhComponentsPage.countDeleteButtons();

    await donViTinhUpdatePage.setDonViTinhCodeInput('donViTinhCode');
    expect(await donViTinhUpdatePage.getDonViTinhCodeInput()).to.match(/donViTinhCode/);
    await donViTinhUpdatePage.setNameInput('name');
    expect(await donViTinhUpdatePage.getNameInput()).to.match(/name/);
    await donViTinhUpdatePage.statusSelectLastOption();
    await waitUntilDisplayed(donViTinhUpdatePage.getSaveButton());
    await donViTinhUpdatePage.save();
    await waitUntilHidden(donViTinhUpdatePage.getSaveButton());
    expect(await donViTinhUpdatePage.getSaveButton().isPresent()).to.be.false;

    await donViTinhComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await donViTinhComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last DonViTinh', async () => {
    await donViTinhComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await donViTinhComponentsPage.countDeleteButtons();
    await donViTinhComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    donViTinhDeleteDialog = new DonViTinhDeleteDialog();
    expect(await donViTinhDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/gatewayApp.commonDonViTinh.delete.question/);
    await donViTinhDeleteDialog.clickOnConfirmButton();

    await donViTinhComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await donViTinhComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
