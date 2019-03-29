import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './tieu-chi-bao-cao.reducer';
import { ITieuChiBaoCao } from 'app/shared/model/donviphathanh/tieu-chi-bao-cao.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITieuChiBaoCaoDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class TieuChiBaoCaoDetail extends React.Component<ITieuChiBaoCaoDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { tieuChiBaoCaoEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="gatewayApp.donviphathanhTieuChiBaoCao.detail.title">TieuChiBaoCao</Translate> [
            <b>{tieuChiBaoCaoEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="tieuChiBaoCaoCode">
                <Translate contentKey="gatewayApp.donviphathanhTieuChiBaoCao.tieuChiBaoCaoCode">Tieu Chi Bao Cao Code</Translate>
              </span>
            </dt>
            <dd>{tieuChiBaoCaoEntity.tieuChiBaoCaoCode}</dd>
            <dt>
              <span id="userName">
                <Translate contentKey="gatewayApp.donviphathanhTieuChiBaoCao.userName">User Name</Translate>
              </span>
            </dt>
            <dd>{tieuChiBaoCaoEntity.userName}</dd>
            <dt>
              <span id="createTime">
                <Translate contentKey="gatewayApp.donviphathanhTieuChiBaoCao.createTime">Create Time</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={tieuChiBaoCaoEntity.createTime} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="updateTime">
                <Translate contentKey="gatewayApp.donviphathanhTieuChiBaoCao.updateTime">Update Time</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={tieuChiBaoCaoEntity.updateTime} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="status">
                <Translate contentKey="gatewayApp.donviphathanhTieuChiBaoCao.status">Status</Translate>
              </span>
            </dt>
            <dd>{tieuChiBaoCaoEntity.status}</dd>
            <dt>
              <span id="program">
                <Translate contentKey="gatewayApp.donviphathanhTieuChiBaoCao.program">Program</Translate>
              </span>
            </dt>
            <dd>{tieuChiBaoCaoEntity.program}</dd>
            <dt>
              <Translate contentKey="gatewayApp.donviphathanhTieuChiBaoCao.tieuchi">Tieuchi</Translate>
            </dt>
            <dd>{tieuChiBaoCaoEntity.tieuchiId ? tieuChiBaoCaoEntity.tieuchiId : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/tieu-chi-bao-cao" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/tieu-chi-bao-cao/${tieuChiBaoCaoEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ tieuChiBaoCao }: IRootState) => ({
  tieuChiBaoCaoEntity: tieuChiBaoCao.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TieuChiBaoCaoDetail);
