/* tslint:disable no-unused-expression */
import { browser, element, by, protractor } from 'protractor';

import NavBarPage from './../../../page-objects/navbar-page';
import SignInPage from './../../../page-objects/signin-page';
import DonViComponentsPage from './don-vi.page-object';
import { DonViDeleteDialog } from './don-vi.page-object';
import DonViUpdatePage from './don-vi-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../../util/utils';

const expect = chai.expect;

describe('DonVi e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let donViUpdatePage: DonViUpdatePage;
  let donViComponentsPage: DonViComponentsPage;
  let donViDeleteDialog: DonViDeleteDialog;

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

  it('should load DonVis', async () => {
    await navBarPage.getEntityPage('don-vi');
    donViComponentsPage = new DonViComponentsPage();
    expect(await donViComponentsPage.getTitle().getText()).to.match(/Don Vis/);
  });

  it('should load create DonVi page', async () => {
    await donViComponentsPage.clickOnCreateButton();
    donViUpdatePage = new DonViUpdatePage();
    expect(await donViUpdatePage.getPageTitle().getAttribute('id')).to.match(/gatewayApp.commonDonVi.home.createOrEditLabel/);
  });

  it('should create and save DonVis', async () => {
    const nbButtonsBeforeCreate = await donViComponentsPage.countDeleteButtons();

    await donViUpdatePage.setDonViCodeInput('donViCode');
    expect(await donViUpdatePage.getDonViCodeInput()).to.match(/donViCode/);
    await donViUpdatePage.setNameInput('name');
    expect(await donViUpdatePage.getNameInput()).to.match(/name/);
    await donViUpdatePage.setUserNameInput('userName');
    expect(await donViUpdatePage.getUserNameInput()).to.match(/userName/);
    await donViUpdatePage.setCreateTimeInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await donViUpdatePage.getCreateTimeInput()).to.contain('2001-01-01T02:30');
    await donViUpdatePage.setUpdateTimeInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await donViUpdatePage.getUpdateTimeInput()).to.contain('2001-01-01T02:30');
    await donViUpdatePage.statusSelectLastOption();
    await donViUpdatePage.setProgramInput('program');
    expect(await donViUpdatePage.getProgramInput()).to.match(/program/);
    await donViUpdatePage.phamviSelectLastOption();
    await waitUntilDisplayed(donViUpdatePage.getSaveButton());
    await donViUpdatePage.save();
    await waitUntilHidden(donViUpdatePage.getSaveButton());
    expect(await donViUpdatePage.getSaveButton().isPresent()).to.be.false;

    await donViComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await donViComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last DonVi', async () => {
    await donViComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await donViComponentsPage.countDeleteButtons();
    await donViComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    donViDeleteDialog = new DonViDeleteDialog();
    expect(await donViDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/gatewayApp.commonDonVi.delete.question/);
    await donViDeleteDialog.clickOnConfirmButton();

    await donViComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await donViComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
