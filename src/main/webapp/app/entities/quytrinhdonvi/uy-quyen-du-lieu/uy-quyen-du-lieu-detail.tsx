import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './uy-quyen-du-lieu.reducer';
import { IUyQuyenDuLieu } from 'app/shared/model/quytrinhdonvi/uy-quyen-du-lieu.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IUyQuyenDuLieuDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class UyQuyenDuLieuDetail extends React.Component<IUyQuyenDuLieuDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { uyQuyenDuLieuEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="gatewayApp.quytrinhdonviUyQuyenDuLieu.detail.title">UyQuyenDuLieu</Translate> [
            <b>{uyQuyenDuLieuEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="fromUserId">
                <Translate contentKey="gatewayApp.quytrinhdonviUyQuyenDuLieu.fromUserId">From User Id</Translate>
              </span>
            </dt>
            <dd>{uyQuyenDuLieuEntity.fromUserId}</dd>
            <dt>
              <span id="toUserId">
                <Translate contentKey="gatewayApp.quytrinhdonviUyQuyenDuLieu.toUserId">To User Id</Translate>
              </span>
            </dt>
            <dd>{uyQuyenDuLieuEntity.toUserId}</dd>
            <dt>
              <span id="role">
                <Translate contentKey="gatewayApp.quytrinhdonviUyQuyenDuLieu.role">Role</Translate>
              </span>
            </dt>
            <dd>{uyQuyenDuLieuEntity.role}</dd>
            <dt>
              <Translate contentKey="gatewayApp.quytrinhdonviUyQuyenDuLieu.duLieuTienTrinh">Du Lieu Tien Trinh</Translate>
            </dt>
            <dd>{uyQuyenDuLieuEntity.duLieuTienTrinhId ? uyQuyenDuLieuEntity.duLieuTienTrinhId : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/uy-quyen-du-lieu" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/uy-quyen-du-lieu/${uyQuyenDuLieuEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ uyQuyenDuLieu }: IRootState) => ({
  uyQuyenDuLieuEntity: uyQuyenDuLieu.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UyQuyenDuLieuDetail);
