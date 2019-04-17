/* tslint:disable no-unused-expression */
import { browser, element, by } from 'protractor';

import NavBarPage from './../../../page-objects/navbar-page';
import SignInPage from './../../../page-objects/signin-page';
import ScreenComponentsPage from './screen.page-object';
import { ScreenDeleteDialog } from './screen.page-object';
import ScreenUpdatePage from './screen-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../../util/utils';

const expect = chai.expect;

describe('Screen e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let screenUpdatePage: ScreenUpdatePage;
  let screenComponentsPage: ScreenComponentsPage;
  let screenDeleteDialog: ScreenDeleteDialog;

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

  it('should load Screens', async () => {
    await navBarPage.getEntityPage('screen');
    screenComponentsPage = new ScreenComponentsPage();
    expect(await screenComponentsPage.getTitle().getText()).to.match(/Screens/);
  });

  it('should load create Screen page', async () => {
    await screenComponentsPage.clickOnCreateButton();
    screenUpdatePage = new ScreenUpdatePage();
    expect(await screenUpdatePage.getPageTitle().getAttribute('id')).to.match(/gatewayApp.phanquyenchucnangScreen.home.createOrEditLabel/);
  });

  it('should create and save Screens', async () => {
    const nbButtonsBeforeCreate = await screenComponentsPage.countDeleteButtons();

    await screenUpdatePage.setScreenCodeInput('screenCode');
    expect(await screenUpdatePage.getScreenCodeInput()).to.match(/screenCode/);
    await screenUpdatePage.setNameInput('name');
    expect(await screenUpdatePage.getNameInput()).to.match(/name/);
    await screenUpdatePage.setLinkInput('link');
    expect(await screenUpdatePage.getLinkInput()).to.match(/link/);
    await waitUntilDisplayed(screenUpdatePage.getSaveButton());
    await screenUpdatePage.save();
    await waitUntilHidden(screenUpdatePage.getSaveButton());
    expect(await screenUpdatePage.getSaveButton().isPresent()).to.be.false;

    await screenComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await screenComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Screen', async () => {
    await screenComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await screenComponentsPage.countDeleteButtons();
    await screenComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    screenDeleteDialog = new ScreenDeleteDialog();
    expect(await screenDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/gatewayApp.phanquyenchucnangScreen.delete.question/);
    await screenDeleteDialog.clickOnConfirmButton();

    await screenComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await screenComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
