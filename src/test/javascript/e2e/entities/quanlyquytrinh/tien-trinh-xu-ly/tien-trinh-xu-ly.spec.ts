/* tslint:disable no-unused-expression */
import { browser, element, by } from 'protractor';

import NavBarPage from './../../../page-objects/navbar-page';
import SignInPage from './../../../page-objects/signin-page';
import TienTrinhXuLyComponentsPage from './tien-trinh-xu-ly.page-object';
import { TienTrinhXuLyDeleteDialog } from './tien-trinh-xu-ly.page-object';
import TienTrinhXuLyUpdatePage from './tien-trinh-xu-ly-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../../util/utils';

const expect = chai.expect;

describe('TienTrinhXuLy e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let tienTrinhXuLyUpdatePage: TienTrinhXuLyUpdatePage;
  let tienTrinhXuLyComponentsPage: TienTrinhXuLyComponentsPage;
  let tienTrinhXuLyDeleteDialog: TienTrinhXuLyDeleteDialog;

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

  it('should load TienTrinhXuLies', async () => {
    await navBarPage.getEntityPage('tien-trinh-xu-ly');
    tienTrinhXuLyComponentsPage = new TienTrinhXuLyComponentsPage();
    expect(await tienTrinhXuLyComponentsPage.getTitle().getText()).to.match(/Tien Trinh Xu Lies/);
  });

  it('should load create TienTrinhXuLy page', async () => {
    await tienTrinhXuLyComponentsPage.clickOnCreateButton();
    tienTrinhXuLyUpdatePage = new TienTrinhXuLyUpdatePage();
    expect(await tienTrinhXuLyUpdatePage.getPageTitle().getAttribute('id')).to.match(
      /gatewayApp.quanlyquytrinhTienTrinhXuLy.home.createOrEditLabel/
    );
  });

  it('should create and save TienTrinhXuLies', async () => {
    const nbButtonsBeforeCreate = await tienTrinhXuLyComponentsPage.countDeleteButtons();

    await tienTrinhXuLyUpdatePage.setBatdauCodeInput('batdauCode');
    expect(await tienTrinhXuLyUpdatePage.getBatdauCodeInput()).to.match(/batdauCode/);
    await tienTrinhXuLyUpdatePage.setKetThucCodeInput('ketThucCode');
    expect(await tienTrinhXuLyUpdatePage.getKetThucCodeInput()).to.match(/ketThucCode/);
    await tienTrinhXuLyUpdatePage.tienTrinhSelectLastOption();
    await waitUntilDisplayed(tienTrinhXuLyUpdatePage.getSaveButton());
    await tienTrinhXuLyUpdatePage.save();
    await waitUntilHidden(tienTrinhXuLyUpdatePage.getSaveButton());
    expect(await tienTrinhXuLyUpdatePage.getSaveButton().isPresent()).to.be.false;

    await tienTrinhXuLyComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await tienTrinhXuLyComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last TienTrinhXuLy', async () => {
    await tienTrinhXuLyComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await tienTrinhXuLyComponentsPage.countDeleteButtons();
    await tienTrinhXuLyComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    tienTrinhXuLyDeleteDialog = new TienTrinhXuLyDeleteDialog();
    expect(await tienTrinhXuLyDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /gatewayApp.quanlyquytrinhTienTrinhXuLy.delete.question/
    );
    await tienTrinhXuLyDeleteDialog.clickOnConfirmButton();

    await tienTrinhXuLyComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await tienTrinhXuLyComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
