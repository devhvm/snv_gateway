/* tslint:disable no-unused-expression */
import { browser, element, by } from 'protractor';

import NavBarPage from './../../../page-objects/navbar-page';
import SignInPage from './../../../page-objects/signin-page';
import MenuRoleComponentsPage from './menu-role.page-object';
import { MenuRoleDeleteDialog } from './menu-role.page-object';
import MenuRoleUpdatePage from './menu-role-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../../util/utils';

const expect = chai.expect;

describe('MenuRole e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let menuRoleUpdatePage: MenuRoleUpdatePage;
  let menuRoleComponentsPage: MenuRoleComponentsPage;
  let menuRoleDeleteDialog: MenuRoleDeleteDialog;

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

  it('should load MenuRoles', async () => {
    await navBarPage.getEntityPage('menu-role');
    menuRoleComponentsPage = new MenuRoleComponentsPage();
    expect(await menuRoleComponentsPage.getTitle().getText()).to.match(/Menu Roles/);
  });

  it('should load create MenuRole page', async () => {
    await menuRoleComponentsPage.clickOnCreateButton();
    menuRoleUpdatePage = new MenuRoleUpdatePage();
    expect(await menuRoleUpdatePage.getPageTitle().getAttribute('id')).to.match(
      /gatewayApp.phanquyenchucnangMenuRole.home.createOrEditLabel/
    );
  });

  it('should create and save MenuRoles', async () => {
    const nbButtonsBeforeCreate = await menuRoleComponentsPage.countDeleteButtons();

    await menuRoleUpdatePage.setMenuItemRoleCodeInput('menuItemRoleCode');
    expect(await menuRoleUpdatePage.getMenuItemRoleCodeInput()).to.match(/menuItemRoleCode/);
    await menuRoleUpdatePage.setRoleInput('role');
    expect(await menuRoleUpdatePage.getRoleInput()).to.match(/role/);
    await menuRoleUpdatePage.setNameInput('name');
    expect(await menuRoleUpdatePage.getNameInput()).to.match(/name/);
    await menuRoleUpdatePage.menuItemSelectLastOption();
    await waitUntilDisplayed(menuRoleUpdatePage.getSaveButton());
    await menuRoleUpdatePage.save();
    await waitUntilHidden(menuRoleUpdatePage.getSaveButton());
    expect(await menuRoleUpdatePage.getSaveButton().isPresent()).to.be.false;

    await menuRoleComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await menuRoleComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last MenuRole', async () => {
    await menuRoleComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await menuRoleComponentsPage.countDeleteButtons();
    await menuRoleComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    menuRoleDeleteDialog = new MenuRoleDeleteDialog();
    expect(await menuRoleDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/gatewayApp.phanquyenchucnangMenuRole.delete.question/);
    await menuRoleDeleteDialog.clickOnConfirmButton();

    await menuRoleComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await menuRoleComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
