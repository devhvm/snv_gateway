/* tslint:disable no-unused-expression */
import { browser, element, by, protractor } from 'protractor';

import NavBarPage from './../../../page-objects/navbar-page';
import SignInPage from './../../../page-objects/signin-page';
import MauPhatHanhComponentsPage from './mau-phat-hanh.page-object';
import { MauPhatHanhDeleteDialog } from './mau-phat-hanh.page-object';
import MauPhatHanhUpdatePage from './mau-phat-hanh-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../../util/utils';

const expect = chai.expect;

describe('MauPhatHanh e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let mauPhatHanhUpdatePage: MauPhatHanhUpdatePage;
  let mauPhatHanhComponentsPage: MauPhatHanhComponentsPage;
  let mauPhatHanhDeleteDialog: MauPhatHanhDeleteDialog;

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

  it('should load MauPhatHanhs', async () => {
    await navBarPage.getEntityPage('mau-phat-hanh');
    mauPhatHanhComponentsPage = new MauPhatHanhComponentsPage();
    expect(await mauPhatHanhComponentsPage.getTitle().getText()).to.match(/Mau Phat Hanhs/);
  });

  it('should load create MauPhatHanh page', async () => {
    await mauPhatHanhComponentsPage.clickOnCreateButton();
    mauPhatHanhUpdatePage = new MauPhatHanhUpdatePage();
    expect(await mauPhatHanhUpdatePage.getPageTitle().getAttribute('id')).to.match(
      /gatewayApp.donviphathanhMauPhatHanh.home.createOrEditLabel/
    );
  });

  it('should create and save MauPhatHanhs', async () => {
    const nbButtonsBeforeCreate = await mauPhatHanhComponentsPage.countDeleteButtons();

    await mauPhatHanhUpdatePage.setMauPhatHanhCodeInput('mauPhatHanhCode');
    expect(await mauPhatHanhUpdatePage.getMauPhatHanhCodeInput()).to.match(/mauPhatHanhCode/);
    await mauPhatHanhUpdatePage.setNameInput('name');
    expect(await mauPhatHanhUpdatePage.getNameInput()).to.match(/name/);
    await mauPhatHanhUpdatePage.setUserNameInput('userName');
    expect(await mauPhatHanhUpdatePage.getUserNameInput()).to.match(/userName/);
    await mauPhatHanhUpdatePage.setCreateTimeInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await mauPhatHanhUpdatePage.getCreateTimeInput()).to.contain('2001-01-01T02:30');
    await mauPhatHanhUpdatePage.setUpdateTimeInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await mauPhatHanhUpdatePage.getUpdateTimeInput()).to.contain('2001-01-01T02:30');
    await mauPhatHanhUpdatePage.statusSelectLastOption();
    await mauPhatHanhUpdatePage.setProgramInput('program');
    expect(await mauPhatHanhUpdatePage.getProgramInput()).to.match(/program/);
    await waitUntilDisplayed(mauPhatHanhUpdatePage.getSaveButton());
    await mauPhatHanhUpdatePage.save();
    await waitUntilHidden(mauPhatHanhUpdatePage.getSaveButton());
    expect(await mauPhatHanhUpdatePage.getSaveButton().isPresent()).to.be.false;

    await mauPhatHanhComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await mauPhatHanhComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last MauPhatHanh', async () => {
    await mauPhatHanhComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await mauPhatHanhComponentsPage.countDeleteButtons();
    await mauPhatHanhComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    mauPhatHanhDeleteDialog = new MauPhatHanhDeleteDialog();
    expect(await mauPhatHanhDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /gatewayApp.donviphathanhMauPhatHanh.delete.question/
    );
    await mauPhatHanhDeleteDialog.clickOnConfirmButton();

    await mauPhatHanhComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await mauPhatHanhComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
