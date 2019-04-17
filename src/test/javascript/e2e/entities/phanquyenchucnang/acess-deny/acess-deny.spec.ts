/* tslint:disable no-unused-expression */
import { browser, element, by } from 'protractor';

import NavBarPage from './../../../page-objects/navbar-page';
import SignInPage from './../../../page-objects/signin-page';
import AcessDenyComponentsPage from './acess-deny.page-object';
import { AcessDenyDeleteDialog } from './acess-deny.page-object';
import AcessDenyUpdatePage from './acess-deny-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../../util/utils';

const expect = chai.expect;

describe('AcessDeny e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let acessDenyUpdatePage: AcessDenyUpdatePage;
  let acessDenyComponentsPage: AcessDenyComponentsPage;
  let acessDenyDeleteDialog: AcessDenyDeleteDialog;

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

  it('should load AcessDenies', async () => {
    await navBarPage.getEntityPage('acess-deny');
    acessDenyComponentsPage = new AcessDenyComponentsPage();
    expect(await acessDenyComponentsPage.getTitle().getText()).to.match(/Acess Denies/);
  });

  it('should load create AcessDeny page', async () => {
    await acessDenyComponentsPage.clickOnCreateButton();
    acessDenyUpdatePage = new AcessDenyUpdatePage();
    expect(await acessDenyUpdatePage.getPageTitle().getAttribute('id')).to.match(
      /gatewayApp.phanquyenchucnangAcessDeny.home.createOrEditLabel/
    );
  });

  it('should create and save AcessDenies', async () => {
    const nbButtonsBeforeCreate = await acessDenyComponentsPage.countDeleteButtons();

    await acessDenyUpdatePage.setUserIdInput('userId');
    expect(await acessDenyUpdatePage.getUserIdInput()).to.match(/userId/);
    await acessDenyUpdatePage.menuItemSelectLastOption();
    await waitUntilDisplayed(acessDenyUpdatePage.getSaveButton());
    await acessDenyUpdatePage.save();
    await waitUntilHidden(acessDenyUpdatePage.getSaveButton());
    expect(await acessDenyUpdatePage.getSaveButton().isPresent()).to.be.false;

    await acessDenyComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await acessDenyComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last AcessDeny', async () => {
    await acessDenyComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await acessDenyComponentsPage.countDeleteButtons();
    await acessDenyComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    acessDenyDeleteDialog = new AcessDenyDeleteDialog();
    expect(await acessDenyDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /gatewayApp.phanquyenchucnangAcessDeny.delete.question/
    );
    await acessDenyDeleteDialog.clickOnConfirmButton();

    await acessDenyComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await acessDenyComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
