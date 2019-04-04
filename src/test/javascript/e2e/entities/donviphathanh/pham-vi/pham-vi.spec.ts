/* tslint:disable no-unused-expression */
import { browser, element, by } from 'protractor';

import NavBarPage from './../../../page-objects/navbar-page';
import SignInPage from './../../../page-objects/signin-page';
import PhamViComponentsPage from './pham-vi.page-object';
import { PhamViDeleteDialog } from './pham-vi.page-object';
import PhamViUpdatePage from './pham-vi-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../../util/utils';

const expect = chai.expect;

describe('PhamVi e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let phamViUpdatePage: PhamViUpdatePage;
  let phamViComponentsPage: PhamViComponentsPage;
  let phamViDeleteDialog: PhamViDeleteDialog;

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

  it('should load PhamVis', async () => {
    await navBarPage.getEntityPage('pham-vi');
    phamViComponentsPage = new PhamViComponentsPage();
    expect(await phamViComponentsPage.getTitle().getText()).to.match(/Pham Vis/);
  });

  it('should load create PhamVi page', async () => {
    await phamViComponentsPage.clickOnCreateButton();
    phamViUpdatePage = new PhamViUpdatePage();
    expect(await phamViUpdatePage.getPageTitle().getAttribute('id')).to.match(/gatewayApp.donviphathanhPhamVi.home.createOrEditLabel/);
  });

  it('should create and save PhamVis', async () => {
    const nbButtonsBeforeCreate = await phamViComponentsPage.countDeleteButtons();

    await phamViUpdatePage.setBeginInput('begin');
    expect(await phamViUpdatePage.getBeginInput()).to.match(/begin/);
    await phamViUpdatePage.setEndInput('end');
    expect(await phamViUpdatePage.getEndInput()).to.match(/end/);
    await waitUntilDisplayed(phamViUpdatePage.getSaveButton());
    await phamViUpdatePage.save();
    await waitUntilHidden(phamViUpdatePage.getSaveButton());
    expect(await phamViUpdatePage.getSaveButton().isPresent()).to.be.false;

    await phamViComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await phamViComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last PhamVi', async () => {
    await phamViComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await phamViComponentsPage.countDeleteButtons();
    await phamViComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    phamViDeleteDialog = new PhamViDeleteDialog();
    expect(await phamViDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/gatewayApp.donviphathanhPhamVi.delete.question/);
    await phamViDeleteDialog.clickOnConfirmButton();

    await phamViComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await phamViComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
