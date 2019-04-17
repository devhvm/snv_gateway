import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './menu.reducer';
import { IMenu } from 'app/shared/model/phanquyenchucnang/menu.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IMenuDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class MenuDetail extends React.Component<IMenuDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { menuEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="gatewayApp.phanquyenchucnangMenu.detail.title">Menu</Translate> [<b>{menuEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="menuCode">
                <Translate contentKey="gatewayApp.phanquyenchucnangMenu.menuCode">Menu Code</Translate>
              </span>
            </dt>
            <dd>{menuEntity.menuCode}</dd>
            <dt>
              <span id="name">
                <Translate contentKey="gatewayApp.phanquyenchucnangMenu.name">Name</Translate>
              </span>
            </dt>
            <dd>{menuEntity.name}</dd>
            <dt>
              <span id="icon">
                <Translate contentKey="gatewayApp.phanquyenchucnangMenu.icon">Icon</Translate>
              </span>
            </dt>
            <dd>{menuEntity.icon}</dd>
          </dl>
          <Button tag={Link} to="/entity/menu" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/menu/${menuEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ menu }: IRootState) => ({
  menuEntity: menu.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MenuDetail);
