import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './acess-deny.reducer';
import { IAcessDeny } from 'app/shared/model/phanquyenchucnang/acess-deny.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IAcessDenyDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class AcessDenyDetail extends React.Component<IAcessDenyDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { acessDenyEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="gatewayApp.phanquyenchucnangAcessDeny.detail.title">AcessDeny</Translate> [<b>{acessDenyEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="userId">
                <Translate contentKey="gatewayApp.phanquyenchucnangAcessDeny.userId">User Id</Translate>
              </span>
            </dt>
            <dd>{acessDenyEntity.userId}</dd>
            <dt>
              <Translate contentKey="gatewayApp.phanquyenchucnangAcessDeny.menuItem">Menu Item</Translate>
            </dt>
            <dd>{acessDenyEntity.menuItemMenuItemCode ? acessDenyEntity.menuItemMenuItemCode : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/acess-deny" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/acess-deny/${acessDenyEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ acessDeny }: IRootState) => ({
  acessDenyEntity: acessDeny.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AcessDenyDetail);
