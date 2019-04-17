import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './menu-role.reducer';
import { IMenuRole } from 'app/shared/model/phanquyenchucnang/menu-role.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IMenuRoleDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class MenuRoleDetail extends React.Component<IMenuRoleDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { menuRoleEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="gatewayApp.phanquyenchucnangMenuRole.detail.title">MenuRole</Translate> [<b>{menuRoleEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="menuItemRoleCode">
                <Translate contentKey="gatewayApp.phanquyenchucnangMenuRole.menuItemRoleCode">Menu Item Role Code</Translate>
              </span>
            </dt>
            <dd>{menuRoleEntity.menuItemRoleCode}</dd>
            <dt>
              <span id="role">
                <Translate contentKey="gatewayApp.phanquyenchucnangMenuRole.role">Role</Translate>
              </span>
            </dt>
            <dd>{menuRoleEntity.role}</dd>
            <dt>
              <span id="name">
                <Translate contentKey="gatewayApp.phanquyenchucnangMenuRole.name">Name</Translate>
              </span>
            </dt>
            <dd>{menuRoleEntity.name}</dd>
            <dt>
              <Translate contentKey="gatewayApp.phanquyenchucnangMenuRole.menuItem">Menu Item</Translate>
            </dt>
            <dd>{menuRoleEntity.menuItemMenuItemCode ? menuRoleEntity.menuItemMenuItemCode : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/menu-role" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/menu-role/${menuRoleEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ menuRole }: IRootState) => ({
  menuRoleEntity: menuRole.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MenuRoleDetail);
