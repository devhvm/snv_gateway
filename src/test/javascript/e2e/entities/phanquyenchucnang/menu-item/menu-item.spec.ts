/* tslint:disable no-unused-expression */
import { browser, element, by } from 'protractor';

import NavBarPage from './../../../page-objects/navbar-page';
import SignInPage from './../../../page-objects/signin-page';
import MenuItemComponentsPage from './menu-item.page-object';
import { MenuItemDeleteDialog } from './menu-item.page-object';
import MenuItemUpdatePage from './menu-item-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../../util/utils';

const expect = chai.expect;

describe('MenuItem e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let menuItemUpdatePage: MenuItemUpdatePage;
  let menuItemComponentsPage: MenuItemComponentsPage;
  let menuItemDeleteDialog: MenuItemDeleteDialog;

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

  it('should load MenuItems', async () => {
    await navBarPage.getEntityPage('menu-item');
    menuItemComponentsPage = new MenuItemComponentsPage();
    expect(await menuItemComponentsPage.getTitle().getText()).to.match(/Menu Items/);
  });

  it('should load create MenuItem page', async () => {
    await menuItemComponentsPage.clickOnCreateButton();
    menuItemUpdatePage = new MenuItemUpdatePage();
    expect(await menuItemUpdatePage.getPageTitle().getAttribute('id')).to.match(
      /gatewayApp.phanquyenchucnangMenuItem.home.createOrEditLabel/
    );
  });

  it('should create and save MenuItems', async () => {
    const nbButtonsBeforeCreate = await menuItemComponentsPage.countDeleteButtons();

    await menuItemUpdatePage.setMenuItemCodeInput('menuItemCode');
    expect(await menuItemUpdatePage.getMenuItemCodeInput()).to.match(/menuItemCode/);
    await menuItemUpdatePage.setNameInput('name');
    expect(await menuItemUpdatePage.getNameInput()).to.match(/name/);
    await menuItemUpdatePage.setIconInput('icon');
    expect(await menuItemUpdatePage.getIconInput()).to.match(/icon/);
    await menuItemUpdatePage.setParrentCodeInput('parrentCode');
    expect(await menuItemUpdatePage.getParrentCodeInput()).to.match(/parrentCode/);
    await menuItemUpdatePage.setOrdNumberInput('5');
    expect(await menuItemUpdatePage.getOrdNumberInput()).to.eq('5');
    await menuItemUpdatePage.setLinkInput('link');
    expect(await menuItemUpdatePage.getLinkInput()).to.match(/link/);
    await menuItemUpdatePage.screenSelectLastOption();
    await menuItemUpdatePage.menuSelectLastOption();
    await waitUntilDisplayed(menuItemUpdatePage.getSaveButton());
    await menuItemUpdatePage.save();
    await waitUntilHidden(menuItemUpdatePage.getSaveButton());
    expect(await menuItemUpdatePage.getSaveButton().isPresent()).to.be.false;

    await menuItemComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await menuItemComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last MenuItem', async () => {
    await menuItemComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await menuItemComponentsPage.countDeleteButtons();
    await menuItemComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    menuItemDeleteDialog = new MenuItemDeleteDialog();
    expect(await menuItemDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/gatewayApp.phanquyenchucnangMenuItem.delete.question/);
    await menuItemDeleteDialog.clickOnConfirmButton();

    await menuItemComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await menuItemComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
