import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './mau-phat-hanh-tieu-chi.reducer';
import { IMauPhatHanhTieuChi } from 'app/shared/model/donviphathanh/mau-phat-hanh-tieu-chi.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IMauPhatHanhTieuChiDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class MauPhatHanhTieuChiDetail extends React.Component<IMauPhatHanhTieuChiDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { mauPhatHanhTieuChiEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="gatewayApp.donviphathanhMauPhatHanhTieuChi.detail.title">MauPhatHanhTieuChi</Translate> [
            <b>{mauPhatHanhTieuChiEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <Translate contentKey="gatewayApp.donviphathanhMauPhatHanhTieuChi.tieuchi">Tieuchi</Translate>
            </dt>
            <dd>{mauPhatHanhTieuChiEntity.tieuchiId ? mauPhatHanhTieuChiEntity.tieuchiId : ''}</dd>
            <dt>
              <Translate contentKey="gatewayApp.donviphathanhMauPhatHanhTieuChi.mauphathanh">Mauphathanh</Translate>
            </dt>
            <dd>{mauPhatHanhTieuChiEntity.mauphathanhId ? mauPhatHanhTieuChiEntity.mauphathanhId : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/mau-phat-hanh-tieu-chi" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/mau-phat-hanh-tieu-chi/${mauPhatHanhTieuChiEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ mauPhatHanhTieuChi }: IRootState) => ({
  mauPhatHanhTieuChiEntity: mauPhatHanhTieuChi.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MauPhatHanhTieuChiDetail);
