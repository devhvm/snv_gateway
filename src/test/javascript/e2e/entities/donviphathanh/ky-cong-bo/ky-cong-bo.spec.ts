/* tslint:disable no-unused-expression */
import { browser, element, by, protractor } from 'protractor';

import NavBarPage from './../../../page-objects/navbar-page';
import SignInPage from './../../../page-objects/signin-page';
import KyCongBoComponentsPage from './ky-cong-bo.page-object';
import { KyCongBoDeleteDialog } from './ky-cong-bo.page-object';
import KyCongBoUpdatePage from './ky-cong-bo-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../../util/utils';

const expect = chai.expect;

describe('KyCongBo e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let kyCongBoUpdatePage: KyCongBoUpdatePage;
  let kyCongBoComponentsPage: KyCongBoComponentsPage;
  let kyCongBoDeleteDialog: KyCongBoDeleteDialog;

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

  it('should load KyCongBos', async () => {
    await navBarPage.getEntityPage('ky-cong-bo');
    kyCongBoComponentsPage = new KyCongBoComponentsPage();
    expect(await kyCongBoComponentsPage.getTitle().getText()).to.match(/Ky Cong Bos/);
  });

  it('should load create KyCongBo page', async () => {
    await kyCongBoComponentsPage.clickOnCreateButton();
    kyCongBoUpdatePage = new KyCongBoUpdatePage();
    expect(await kyCongBoUpdatePage.getPageTitle().getAttribute('id')).to.match(/gatewayApp.donviphathanhKyCongBo.home.createOrEditLabel/);
  });

  it('should create and save KyCongBos', async () => {
    const nbButtonsBeforeCreate = await kyCongBoComponentsPage.countDeleteButtons();

    await kyCongBoUpdatePage.setKyCongBoCodeInput('kyCongBoCode');
    expect(await kyCongBoUpdatePage.getKyCongBoCodeInput()).to.match(/kyCongBoCode/);
    await kyCongBoUpdatePage.setNameInput('name');
    expect(await kyCongBoUpdatePage.getNameInput()).to.match(/name/);
    await kyCongBoUpdatePage.setUserNameInput('userName');
    expect(await kyCongBoUpdatePage.getUserNameInput()).to.match(/userName/);
    await kyCongBoUpdatePage.setCreateTimeInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await kyCongBoUpdatePage.getCreateTimeInput()).to.contain('2001-01-01T02:30');
    await kyCongBoUpdatePage.setUpdateTimeInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await kyCongBoUpdatePage.getUpdateTimeInput()).to.contain('2001-01-01T02:30');
    await kyCongBoUpdatePage.statusSelectLastOption();
    await kyCongBoUpdatePage.setProgramInput('program');
    expect(await kyCongBoUpdatePage.getProgramInput()).to.match(/program/);
    await waitUntilDisplayed(kyCongBoUpdatePage.getSaveButton());
    await kyCongBoUpdatePage.save();
    await waitUntilHidden(kyCongBoUpdatePage.getSaveButton());
    expect(await kyCongBoUpdatePage.getSaveButton().isPresent()).to.be.false;

    await kyCongBoComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await kyCongBoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last KyCongBo', async () => {
    await kyCongBoComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await kyCongBoComponentsPage.countDeleteButtons();
    await kyCongBoComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    kyCongBoDeleteDialog = new KyCongBoDeleteDialog();
    expect(await kyCongBoDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/gatewayApp.donviphathanhKyCongBo.delete.question/);
    await kyCongBoDeleteDialog.clickOnConfirmButton();

    await kyCongBoComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await kyCongBoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
