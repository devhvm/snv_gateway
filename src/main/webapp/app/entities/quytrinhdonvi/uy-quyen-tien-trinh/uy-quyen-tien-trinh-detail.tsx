import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './uy-quyen-tien-trinh.reducer';
import { IUyQuyenTienTrinh } from 'app/shared/model/quytrinhdonvi/uy-quyen-tien-trinh.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IUyQuyenTienTrinhDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class UyQuyenTienTrinhDetail extends React.Component<IUyQuyenTienTrinhDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { uyQuyenTienTrinhEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="gatewayApp.quytrinhdonviUyQuyenTienTrinh.detail.title">UyQuyenTienTrinh</Translate> [
            <b>{uyQuyenTienTrinhEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="tienTrinhCode">
                <Translate contentKey="gatewayApp.quytrinhdonviUyQuyenTienTrinh.tienTrinhCode">Tien Trinh Code</Translate>
              </span>
            </dt>
            <dd>{uyQuyenTienTrinhEntity.tienTrinhCode}</dd>
            <dt>
              <span id="fromUserId">
                <Translate contentKey="gatewayApp.quytrinhdonviUyQuyenTienTrinh.fromUserId">From User Id</Translate>
              </span>
            </dt>
            <dd>{uyQuyenTienTrinhEntity.fromUserId}</dd>
            <dt>
              <span id="toUserId">
                <Translate contentKey="gatewayApp.quytrinhdonviUyQuyenTienTrinh.toUserId">To User Id</Translate>
              </span>
            </dt>
            <dd>{uyQuyenTienTrinhEntity.toUserId}</dd>
            <dt>
              <span id="role">
                <Translate contentKey="gatewayApp.quytrinhdonviUyQuyenTienTrinh.role">Role</Translate>
              </span>
            </dt>
            <dd>{uyQuyenTienTrinhEntity.role}</dd>
            <dt>
              <Translate contentKey="gatewayApp.quytrinhdonviUyQuyenTienTrinh.quyTrinhDonVi">Quy Trinh Don Vi</Translate>
            </dt>
            <dd>{uyQuyenTienTrinhEntity.quyTrinhDonViName ? uyQuyenTienTrinhEntity.quyTrinhDonViName : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/uy-quyen-tien-trinh" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/uy-quyen-tien-trinh/${uyQuyenTienTrinhEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ uyQuyenTienTrinh }: IRootState) => ({
  uyQuyenTienTrinhEntity: uyQuyenTienTrinh.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UyQuyenTienTrinhDetail);
