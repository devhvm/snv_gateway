import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './du-lieu-tien-trinh.reducer';
import { IDuLieuTienTrinh } from 'app/shared/model/quytrinhdonvi/du-lieu-tien-trinh.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IDuLieuTienTrinhDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class DuLieuTienTrinhDetail extends React.Component<IDuLieuTienTrinhDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { duLieuTienTrinhEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="gatewayApp.quytrinhdonviDuLieuTienTrinh.detail.title">DuLieuTienTrinh</Translate> [
            <b>{duLieuTienTrinhEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="tienTrinhCode">
                <Translate contentKey="gatewayApp.quytrinhdonviDuLieuTienTrinh.tienTrinhCode">Tien Trinh Code</Translate>
              </span>
            </dt>
            <dd>{duLieuTienTrinhEntity.tienTrinhCode}</dd>
            <dt>
              <span id="duLieuCode">
                <Translate contentKey="gatewayApp.quytrinhdonviDuLieuTienTrinh.duLieuCode">Du Lieu Code</Translate>
              </span>
            </dt>
            <dd>{duLieuTienTrinhEntity.duLieuCode}</dd>
            <dt>
              <span id="fromUserId">
                <Translate contentKey="gatewayApp.quytrinhdonviDuLieuTienTrinh.fromUserId">From User Id</Translate>
              </span>
            </dt>
            <dd>{duLieuTienTrinhEntity.fromUserId}</dd>
            <dt>
              <span id="toUserId">
                <Translate contentKey="gatewayApp.quytrinhdonviDuLieuTienTrinh.toUserId">To User Id</Translate>
              </span>
            </dt>
            <dd>{duLieuTienTrinhEntity.toUserId}</dd>
            <dt>
              <span id="level">
                <Translate contentKey="gatewayApp.quytrinhdonviDuLieuTienTrinh.level">Level</Translate>
              </span>
            </dt>
            <dd>{duLieuTienTrinhEntity.level}</dd>
            <dt>
              <span id="note">
                <Translate contentKey="gatewayApp.quytrinhdonviDuLieuTienTrinh.note">Note</Translate>
              </span>
            </dt>
            <dd>{duLieuTienTrinhEntity.note}</dd>
            <dt>
              <Translate contentKey="gatewayApp.quytrinhdonviDuLieuTienTrinh.quyTrinhDonVi">Quy Trinh Don Vi</Translate>
            </dt>
            <dd>{duLieuTienTrinhEntity.quyTrinhDonViName ? duLieuTienTrinhEntity.quyTrinhDonViName : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/du-lieu-tien-trinh" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/du-lieu-tien-trinh/${duLieuTienTrinhEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ duLieuTienTrinh }: IRootState) => ({
  duLieuTienTrinhEntity: duLieuTienTrinh.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DuLieuTienTrinhDetail);
