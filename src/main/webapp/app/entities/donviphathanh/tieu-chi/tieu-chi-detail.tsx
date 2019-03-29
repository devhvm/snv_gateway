import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './tieu-chi.reducer';
import { ITieuChi } from 'app/shared/model/donviphathanh/tieu-chi.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITieuChiDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class TieuChiDetail extends React.Component<ITieuChiDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { tieuChiEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="gatewayApp.donviphathanhTieuChi.detail.title">TieuChi</Translate> [<b>{tieuChiEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="tieuChiCode">
                <Translate contentKey="gatewayApp.donviphathanhTieuChi.tieuChiCode">Tieu Chi Code</Translate>
              </span>
            </dt>
            <dd>{tieuChiEntity.tieuChiCode}</dd>
            <dt>
              <span id="name">
                <Translate contentKey="gatewayApp.donviphathanhTieuChi.name">Name</Translate>
              </span>
            </dt>
            <dd>{tieuChiEntity.name}</dd>
            <dt>
              <span id="userName">
                <Translate contentKey="gatewayApp.donviphathanhTieuChi.userName">User Name</Translate>
              </span>
            </dt>
            <dd>{tieuChiEntity.userName}</dd>
            <dt>
              <span id="createTime">
                <Translate contentKey="gatewayApp.donviphathanhTieuChi.createTime">Create Time</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={tieuChiEntity.createTime} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="updateTime">
                <Translate contentKey="gatewayApp.donviphathanhTieuChi.updateTime">Update Time</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={tieuChiEntity.updateTime} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="status">
                <Translate contentKey="gatewayApp.donviphathanhTieuChi.status">Status</Translate>
              </span>
            </dt>
            <dd>{tieuChiEntity.status}</dd>
            <dt>
              <span id="program">
                <Translate contentKey="gatewayApp.donviphathanhTieuChi.program">Program</Translate>
              </span>
            </dt>
            <dd>{tieuChiEntity.program}</dd>
            <dt>
              <Translate contentKey="gatewayApp.donviphathanhTieuChi.kycongbo">Kycongbo</Translate>
            </dt>
            <dd>{tieuChiEntity.kycongboId ? tieuChiEntity.kycongboId : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/tieu-chi" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/tieu-chi/${tieuChiEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ tieuChi }: IRootState) => ({
  tieuChiEntity: tieuChi.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TieuChiDetail);
