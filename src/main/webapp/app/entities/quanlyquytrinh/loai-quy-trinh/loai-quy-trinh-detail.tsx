import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './loai-quy-trinh.reducer';
import { ILoaiQuyTrinh } from 'app/shared/model/quanlyquytrinh/loai-quy-trinh.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ILoaiQuyTrinhDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class LoaiQuyTrinhDetail extends React.Component<ILoaiQuyTrinhDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { loaiQuyTrinhEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="gatewayApp.quanlyquytrinhLoaiQuyTrinh.detail.title">LoaiQuyTrinh</Translate> [
            <b>{loaiQuyTrinhEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="loaiQuyTrinhCode">
                <Translate contentKey="gatewayApp.quanlyquytrinhLoaiQuyTrinh.loaiQuyTrinhCode">Loai Quy Trinh Code</Translate>
              </span>
            </dt>
            <dd>{loaiQuyTrinhEntity.loaiQuyTrinhCode}</dd>
            <dt>
              <span id="methodName">
                <Translate contentKey="gatewayApp.quanlyquytrinhLoaiQuyTrinh.methodName">Method Name</Translate>
              </span>
            </dt>
            <dd>{loaiQuyTrinhEntity.methodName}</dd>
            <dt>
              <span id="entityName">
                <Translate contentKey="gatewayApp.quanlyquytrinhLoaiQuyTrinh.entityName">Entity Name</Translate>
              </span>
            </dt>
            <dd>{loaiQuyTrinhEntity.entityName}</dd>
            <dt>
              <span id="serviceName">
                <Translate contentKey="gatewayApp.quanlyquytrinhLoaiQuyTrinh.serviceName">Service Name</Translate>
              </span>
            </dt>
            <dd>{loaiQuyTrinhEntity.serviceName}</dd>
          </dl>
          <Button tag={Link} to="/entity/loai-quy-trinh" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/loai-quy-trinh/${loaiQuyTrinhEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ loaiQuyTrinh }: IRootState) => ({
  loaiQuyTrinhEntity: loaiQuyTrinh.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoaiQuyTrinhDetail);
