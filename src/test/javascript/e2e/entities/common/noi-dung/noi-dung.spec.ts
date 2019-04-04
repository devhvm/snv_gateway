/* tslint:disable no-unused-expression */
import { browser, element, by } from 'protractor';

import NavBarPage from './../../../page-objects/navbar-page';
import SignInPage from './../../../page-objects/signin-page';
import NoiDungComponentsPage from './noi-dung.page-object';
import { NoiDungDeleteDialog } from './noi-dung.page-object';
import NoiDungUpdatePage from './noi-dung-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../../util/utils';

const expect = chai.expect;

describe('NoiDung e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let noiDungUpdatePage: NoiDungUpdatePage;
  let noiDungComponentsPage: NoiDungComponentsPage;
  let noiDungDeleteDialog: NoiDungDeleteDialog;

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

  it('should load NoiDungs', async () => {
    await navBarPage.getEntityPage('noi-dung');
    noiDungComponentsPage = new NoiDungComponentsPage();
    expect(await noiDungComponentsPage.getTitle().getText()).to.match(/Noi Dungs/);
  });

  it('should load create NoiDung page', async () => {
    await noiDungComponentsPage.clickOnCreateButton();
    noiDungUpdatePage = new NoiDungUpdatePage();
    expect(await noiDungUpdatePage.getPageTitle().getAttribute('id')).to.match(/gatewayApp.commonNoiDung.home.createOrEditLabel/);
  });

  it('should create and save NoiDungs', async () => {
    const nbButtonsBeforeCreate = await noiDungComponentsPage.countDeleteButtons();

    await noiDungUpdatePage.setNoiDungCodeInput('noiDungCode');
    expect(await noiDungUpdatePage.getNoiDungCodeInput()).to.match(/noiDungCode/);
    await noiDungUpdatePage.statusSelectLastOption();
    await noiDungUpdatePage.nhomnoidungSelectLastOption();
    await waitUntilDisplayed(noiDungUpdatePage.getSaveButton());
    await noiDungUpdatePage.save();
    await waitUntilHidden(noiDungUpdatePage.getSaveButton());
    expect(await noiDungUpdatePage.getSaveButton().isPresent()).to.be.false;

    await noiDungComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await noiDungComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last NoiDung', async () => {
    await noiDungComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await noiDungComponentsPage.countDeleteButtons();
    await noiDungComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    noiDungDeleteDialog = new NoiDungDeleteDialog();
    expect(await noiDungDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/gatewayApp.commonNoiDung.delete.question/);
    await noiDungDeleteDialog.clickOnConfirmButton();

    await noiDungComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await noiDungComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
