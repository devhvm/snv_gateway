/* tslint:disable no-unused-expression */
import { browser, element, by } from 'protractor';

import NavBarPage from './../../../page-objects/navbar-page';
import SignInPage from './../../../page-objects/signin-page';
import CoQuanHanhChinhComponentsPage from './co-quan-hanh-chinh.page-object';
import { CoQuanHanhChinhDeleteDialog } from './co-quan-hanh-chinh.page-object';
import CoQuanHanhChinhUpdatePage from './co-quan-hanh-chinh-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../../util/utils';

const expect = chai.expect;

describe('CoQuanHanhChinh e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let coQuanHanhChinhUpdatePage: CoQuanHanhChinhUpdatePage;
  let coQuanHanhChinhComponentsPage: CoQuanHanhChinhComponentsPage;
  let coQuanHanhChinhDeleteDialog: CoQuanHanhChinhDeleteDialog;

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

  it('should load CoQuanHanhChinhs', async () => {
    await navBarPage.getEntityPage('co-quan-hanh-chinh');
    coQuanHanhChinhComponentsPage = new CoQuanHanhChinhComponentsPage();
    expect(await coQuanHanhChinhComponentsPage.getTitle().getText()).to.match(/Co Quan Hanh Chinhs/);
  });

  it('should load create CoQuanHanhChinh page', async () => {
    await coQuanHanhChinhComponentsPage.clickOnCreateButton();
    coQuanHanhChinhUpdatePage = new CoQuanHanhChinhUpdatePage();
    expect(await coQuanHanhChinhUpdatePage.getPageTitle().getAttribute('id')).to.match(
      /gatewayApp.quytrinhdonviCoQuanHanhChinh.home.createOrEditLabel/
    );
  });

  it('should create and save CoQuanHanhChinhs', async () => {
    const nbButtonsBeforeCreate = await coQuanHanhChinhComponentsPage.countDeleteButtons();

    await coQuanHanhChinhUpdatePage.setCoQuanHanhChinhCodeInput('coQuanHanhChinhCode');
    expect(await coQuanHanhChinhUpdatePage.getCoQuanHanhChinhCodeInput()).to.match(/coQuanHanhChinhCode/);
    await coQuanHanhChinhUpdatePage.setNameInput('name');
    expect(await coQuanHanhChinhUpdatePage.getNameInput()).to.match(/name/);
    await coQuanHanhChinhUpdatePage.setDescriptionInput('description');
    expect(await coQuanHanhChinhUpdatePage.getDescriptionInput()).to.match(/description/);
    await coQuanHanhChinhUpdatePage.setMaDinhDanhCodeInput('maDinhDanhCode');
    expect(await coQuanHanhChinhUpdatePage.getMaDinhDanhCodeInput()).to.match(/maDinhDanhCode/);
    await coQuanHanhChinhUpdatePage.setLevelInput('level');
    expect(await coQuanHanhChinhUpdatePage.getLevelInput()).to.match(/level/);
    await coQuanHanhChinhUpdatePage.setStatusInput('status');
    expect(await coQuanHanhChinhUpdatePage.getStatusInput()).to.match(/status/);
    await waitUntilDisplayed(coQuanHanhChinhUpdatePage.getSaveButton());
    await coQuanHanhChinhUpdatePage.save();
    await waitUntilHidden(coQuanHanhChinhUpdatePage.getSaveButton());
    expect(await coQuanHanhChinhUpdatePage.getSaveButton().isPresent()).to.be.false;

    await coQuanHanhChinhComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await coQuanHanhChinhComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last CoQuanHanhChinh', async () => {
    await coQuanHanhChinhComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await coQuanHanhChinhComponentsPage.countDeleteButtons();
    await coQuanHanhChinhComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    coQuanHanhChinhDeleteDialog = new CoQuanHanhChinhDeleteDialog();
    expect(await coQuanHanhChinhDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /gatewayApp.quytrinhdonviCoQuanHanhChinh.delete.question/
    );
    await coQuanHanhChinhDeleteDialog.clickOnConfirmButton();

    await coQuanHanhChinhComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await coQuanHanhChinhComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
