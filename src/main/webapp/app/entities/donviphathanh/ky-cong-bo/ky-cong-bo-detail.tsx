import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './ky-cong-bo.reducer';
import { IKyCongBo } from 'app/shared/model/donviphathanh/ky-cong-bo.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IKyCongBoDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class KyCongBoDetail extends React.Component<IKyCongBoDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { kyCongBoEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="gatewayApp.donviphathanhKyCongBo.detail.title">KyCongBo</Translate> [<b>{kyCongBoEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="kyCongBoCode">
                <Translate contentKey="gatewayApp.donviphathanhKyCongBo.kyCongBoCode">Ky Cong Bo Code</Translate>
              </span>
            </dt>
            <dd>{kyCongBoEntity.kyCongBoCode}</dd>
            <dt>
              <span id="name">
                <Translate contentKey="gatewayApp.donviphathanhKyCongBo.name">Name</Translate>
              </span>
            </dt>
            <dd>{kyCongBoEntity.name}</dd>
            <dt>
              <span id="status">
                <Translate contentKey="gatewayApp.donviphathanhKyCongBo.status">Status</Translate>
              </span>
            </dt>
            <dd>{kyCongBoEntity.status}</dd>
          </dl>
          <Button tag={Link} to="/entity/ky-cong-bo" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/ky-cong-bo/${kyCongBoEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ kyCongBo }: IRootState) => ({
  kyCongBoEntity: kyCongBo.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(KyCongBoDetail);
