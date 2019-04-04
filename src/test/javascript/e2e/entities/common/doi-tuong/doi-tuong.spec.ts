/* tslint:disable no-unused-expression */
import { browser, element, by } from 'protractor';

import NavBarPage from './../../../page-objects/navbar-page';
import SignInPage from './../../../page-objects/signin-page';
import DoiTuongComponentsPage from './doi-tuong.page-object';
import { DoiTuongDeleteDialog } from './doi-tuong.page-object';
import DoiTuongUpdatePage from './doi-tuong-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../../util/utils';

const expect = chai.expect;

describe('DoiTuong e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let doiTuongUpdatePage: DoiTuongUpdatePage;
  let doiTuongComponentsPage: DoiTuongComponentsPage;
  let doiTuongDeleteDialog: DoiTuongDeleteDialog;

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

  it('should load DoiTuongs', async () => {
    await navBarPage.getEntityPage('doi-tuong');
    doiTuongComponentsPage = new DoiTuongComponentsPage();
    expect(await doiTuongComponentsPage.getTitle().getText()).to.match(/Doi Tuongs/);
  });

  it('should load create DoiTuong page', async () => {
    await doiTuongComponentsPage.clickOnCreateButton();
    doiTuongUpdatePage = new DoiTuongUpdatePage();
    expect(await doiTuongUpdatePage.getPageTitle().getAttribute('id')).to.match(/gatewayApp.commonDoiTuong.home.createOrEditLabel/);
  });

  it('should create and save DoiTuongs', async () => {
    const nbButtonsBeforeCreate = await doiTuongComponentsPage.countDeleteButtons();

    await doiTuongUpdatePage.setDoiTuongCodeInput('doiTuongCode');
    expect(await doiTuongUpdatePage.getDoiTuongCodeInput()).to.match(/doiTuongCode/);
    await doiTuongUpdatePage.setNameInput('name');
    expect(await doiTuongUpdatePage.getNameInput()).to.match(/name/);
    await doiTuongUpdatePage.statusSelectLastOption();
    await doiTuongUpdatePage.nhomphanloaiSelectLastOption();
    await waitUntilDisplayed(doiTuongUpdatePage.getSaveButton());
    await doiTuongUpdatePage.save();
    await waitUntilHidden(doiTuongUpdatePage.getSaveButton());
    expect(await doiTuongUpdatePage.getSaveButton().isPresent()).to.be.false;

    await doiTuongComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await doiTuongComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last DoiTuong', async () => {
    await doiTuongComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await doiTuongComponentsPage.countDeleteButtons();
    await doiTuongComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    doiTuongDeleteDialog = new DoiTuongDeleteDialog();
    expect(await doiTuongDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/gatewayApp.commonDoiTuong.delete.question/);
    await doiTuongDeleteDialog.clickOnConfirmButton();

    await doiTuongComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await doiTuongComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
