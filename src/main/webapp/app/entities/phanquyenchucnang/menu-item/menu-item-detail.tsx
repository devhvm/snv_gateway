import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './menu-item.reducer';
import { IMenuItem } from 'app/shared/model/phanquyenchucnang/menu-item.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IMenuItemDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class MenuItemDetail extends React.Component<IMenuItemDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { menuItemEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="gatewayApp.phanquyenchucnangMenuItem.detail.title">MenuItem</Translate> [<b>{menuItemEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="menuItemCode">
                <Translate contentKey="gatewayApp.phanquyenchucnangMenuItem.menuItemCode">Menu Item Code</Translate>
              </span>
            </dt>
            <dd>{menuItemEntity.menuItemCode}</dd>
            <dt>
              <span id="name">
                <Translate contentKey="gatewayApp.phanquyenchucnangMenuItem.name">Name</Translate>
              </span>
            </dt>
            <dd>{menuItemEntity.name}</dd>
            <dt>
              <span id="icon">
                <Translate contentKey="gatewayApp.phanquyenchucnangMenuItem.icon">Icon</Translate>
              </span>
            </dt>
            <dd>{menuItemEntity.icon}</dd>
            <dt>
              <Translate contentKey="gatewayApp.phanquyenchucnangMenuItem.screen">Screen</Translate>
            </dt>
            <dd>{menuItemEntity.screenScreenCode ? menuItemEntity.screenScreenCode : ''}</dd>
            <dt>
              <Translate contentKey="gatewayApp.phanquyenchucnangMenuItem.menu">Menu</Translate>
            </dt>
            <dd>{menuItemEntity.menuMenuCode ? menuItemEntity.menuMenuCode : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/menu-item" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/menu-item/${menuItemEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.edit">Edit</Translate>
            </span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ menuItem }: IRootState) => ({
  menuItemEntity: menuItem.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MenuItemDetail);
