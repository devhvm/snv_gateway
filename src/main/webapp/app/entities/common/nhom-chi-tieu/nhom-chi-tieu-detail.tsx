import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './nhom-chi-tieu.reducer';
import { INhomChiTieu } from 'app/shared/model/common/nhom-chi-tieu.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface INhomChiTieuDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class NhomChiTieuDetail extends React.Component<INhomChiTieuDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { nhomChiTieuEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="gatewayApp.commonNhomChiTieu.detail.title">NhomChiTieu</Translate> [<b>{nhomChiTieuEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="nhomChiTieuCode">
                <Translate contentKey="gatewayApp.commonNhomChiTieu.nhomChiTieuCode">Nhom Chi Tieu Code</Translate>
              </span>
            </dt>
            <dd>{nhomChiTieuEntity.nhomChiTieuCode}</dd>
            <dt>
              <span id="name">
                <Translate contentKey="gatewayApp.commonNhomChiTieu.name">Name</Translate>
              </span>
            </dt>
            <dd>{nhomChiTieuEntity.name}</dd>
            <dt>
              <span id="status">
                <Translate contentKey="gatewayApp.commonNhomChiTieu.status">Status</Translate>
              </span>
            </dt>
            <dd>{nhomChiTieuEntity.status}</dd>
          </dl>
          <Button tag={Link} to="/entity/nhom-chi-tieu" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/nhom-chi-tieu/${nhomChiTieuEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ nhomChiTieu }: IRootState) => ({
  nhomChiTieuEntity: nhomChiTieu.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NhomChiTieuDetail);
