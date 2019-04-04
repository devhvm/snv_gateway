import React from 'react';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Translate, translate } from 'react-jhipster';
import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from '../header-components';

export const EntitiesMenu = props => (
  // tslint:disable-next-line:jsx-self-close
  <NavDropdown icon="th-list" name={translate('global.menu.entities.main')} id="entity-menu">
    <DropdownItem tag={Link} to="/entity/nhom-chi-tieu">
      <FontAwesomeIcon icon="asterisk" fixedWidth />
      &nbsp;
      <Translate contentKey="global.menu.entities.commonNhomChiTieu" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/chi-tieu">
      <FontAwesomeIcon icon="asterisk" fixedWidth />
      &nbsp;
      <Translate contentKey="global.menu.entities.commonChiTieu" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/nhom-danh-muc">
      <FontAwesomeIcon icon="asterisk" fixedWidth />
      &nbsp;
      <Translate contentKey="global.menu.entities.commonNhomDanhMuc" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/danh-muc">
      <FontAwesomeIcon icon="asterisk" fixedWidth />
      &nbsp;
      <Translate contentKey="global.menu.entities.commonDanhMuc" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/nhom-phan-loai">
      <FontAwesomeIcon icon="asterisk" fixedWidth />
      &nbsp;
      <Translate contentKey="global.menu.entities.commonNhomPhanLoai" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/doi-tuong">
      <FontAwesomeIcon icon="asterisk" fixedWidth />
      &nbsp;
      <Translate contentKey="global.menu.entities.commonDoiTuong" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/don-vi-tinh">
      <FontAwesomeIcon icon="asterisk" fixedWidth />
      &nbsp;
      <Translate contentKey="global.menu.entities.commonDonViTinh" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/nhom-noi-dung">
      <FontAwesomeIcon icon="asterisk" fixedWidth />
      &nbsp;
      <Translate contentKey="global.menu.entities.commonNhomNoiDung" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/noi-dung">
      <FontAwesomeIcon icon="asterisk" fixedWidth />
      &nbsp;
      <Translate contentKey="global.menu.entities.commonNoiDung" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/mau-phat-hanh">
      <FontAwesomeIcon icon="asterisk" fixedWidth />
      &nbsp;
      <Translate contentKey="global.menu.entities.donviphathanhMauPhatHanh" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/mau-phat-hanh-tieu-chi">
      <FontAwesomeIcon icon="asterisk" fixedWidth />
      &nbsp;
      <Translate contentKey="global.menu.entities.donviphathanhMauPhatHanhTieuChi" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/tieu-chi">
      <FontAwesomeIcon icon="asterisk" fixedWidth />
      &nbsp;
      <Translate contentKey="global.menu.entities.donviphathanhTieuChi" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/ky-cong-bo">
      <FontAwesomeIcon icon="asterisk" fixedWidth />
      &nbsp;
      <Translate contentKey="global.menu.entities.donviphathanhKyCongBo" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/tieu-chi-bao-cao">
      <FontAwesomeIcon icon="asterisk" fixedWidth />
      &nbsp;
      <Translate contentKey="global.menu.entities.donviphathanhTieuChiBaoCao" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/pham-vi">
      <FontAwesomeIcon icon="asterisk" fixedWidth />
      &nbsp;
      <Translate contentKey="global.menu.entities.donviphathanhPhamVi" />
    </DropdownItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
