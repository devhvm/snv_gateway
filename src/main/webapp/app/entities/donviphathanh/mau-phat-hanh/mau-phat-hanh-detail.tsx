import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './mau-phat-hanh.reducer';
import { IMauPhatHanh } from 'app/shared/model/donviphathanh/mau-phat-hanh.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IMauPhatHanhDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class MauPhatHanhDetail extends React.Component<IMauPhatHanhDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { mauPhatHanhEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="gatewayApp.donviphathanhMauPhatHanh.detail.title">MauPhatHanh</Translate> [<b>{mauPhatHanhEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="mauPhatHanhCode">
                <Translate contentKey="gatewayApp.donviphathanhMauPhatHanh.mauPhatHanhCode">Mau Phat Hanh Code</Translate>
              </span>
            </dt>
            <dd>{mauPhatHanhEntity.mauPhatHanhCode}</dd>
            <dt>
              <span id="name">
                <Translate contentKey="gatewayApp.donviphathanhMauPhatHanh.name">Name</Translate>
              </span>
            </dt>
            <dd>{mauPhatHanhEntity.name}</dd>
            <dt>
              <span id="status">
                <Translate contentKey="gatewayApp.donviphathanhMauPhatHanh.status">Status</Translate>
              </span>
            </dt>
            <dd>{mauPhatHanhEntity.status}</dd>
            <dt>
              <Translate contentKey="gatewayApp.donviphathanhMauPhatHanh.phamvi">Phamvi</Translate>
            </dt>
            <dd>{mauPhatHanhEntity.phamviId ? mauPhatHanhEntity.phamviId : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/mau-phat-hanh" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/mau-phat-hanh/${mauPhatHanhEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ mauPhatHanh }: IRootState) => ({
  mauPhatHanhEntity: mauPhatHanh.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MauPhatHanhDetail);
