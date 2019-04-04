/* tslint:disable no-unused-expression */
import { browser, element, by } from 'protractor';

import NavBarPage from './../../../page-objects/navbar-page';
import SignInPage from './../../../page-objects/signin-page';
import TieuChiBaoCaoComponentsPage from './tieu-chi-bao-cao.page-object';
import { TieuChiBaoCaoDeleteDialog } from './tieu-chi-bao-cao.page-object';
import TieuChiBaoCaoUpdatePage from './tieu-chi-bao-cao-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../../util/utils';

const expect = chai.expect;

describe('TieuChiBaoCao e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let tieuChiBaoCaoUpdatePage: TieuChiBaoCaoUpdatePage;
  let tieuChiBaoCaoComponentsPage: TieuChiBaoCaoComponentsPage;
  let tieuChiBaoCaoDeleteDialog: TieuChiBaoCaoDeleteDialog;

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

  it('should load TieuChiBaoCaos', async () => {
    await navBarPage.getEntityPage('tieu-chi-bao-cao');
    tieuChiBaoCaoComponentsPage = new TieuChiBaoCaoComponentsPage();
    expect(await tieuChiBaoCaoComponentsPage.getTitle().getText()).to.match(/Tieu Chi Bao Caos/);
  });

  it('should load create TieuChiBaoCao page', async () => {
    await tieuChiBaoCaoComponentsPage.clickOnCreateButton();
    tieuChiBaoCaoUpdatePage = new TieuChiBaoCaoUpdatePage();
    expect(await tieuChiBaoCaoUpdatePage.getPageTitle().getAttribute('id')).to.match(
      /gatewayApp.donviphathanhTieuChiBaoCao.home.createOrEditLabel/
    );
  });

  it('should create and save TieuChiBaoCaos', async () => {
    const nbButtonsBeforeCreate = await tieuChiBaoCaoComponentsPage.countDeleteButtons();

    await tieuChiBaoCaoUpdatePage.setTieuChiBaoCaoCodeInput('tieuChiBaoCaoCode');
    expect(await tieuChiBaoCaoUpdatePage.getTieuChiBaoCaoCodeInput()).to.match(/tieuChiBaoCaoCode/);
    await tieuChiBaoCaoUpdatePage.statusSelectLastOption();
    await tieuChiBaoCaoUpdatePage.tieuchiSelectLastOption();
    await waitUntilDisplayed(tieuChiBaoCaoUpdatePage.getSaveButton());
    await tieuChiBaoCaoUpdatePage.save();
    await waitUntilHidden(tieuChiBaoCaoUpdatePage.getSaveButton());
    expect(await tieuChiBaoCaoUpdatePage.getSaveButton().isPresent()).to.be.false;

    await tieuChiBaoCaoComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await tieuChiBaoCaoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last TieuChiBaoCao', async () => {
    await tieuChiBaoCaoComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await tieuChiBaoCaoComponentsPage.countDeleteButtons();
    await tieuChiBaoCaoComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    tieuChiBaoCaoDeleteDialog = new TieuChiBaoCaoDeleteDialog();
    expect(await tieuChiBaoCaoDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /gatewayApp.donviphathanhTieuChiBaoCao.delete.question/
    );
    await tieuChiBaoCaoDeleteDialog.clickOnConfirmButton();

    await tieuChiBaoCaoComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await tieuChiBaoCaoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
