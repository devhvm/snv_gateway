import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './nhom-phan-loai.reducer';
import { INhomPhanLoai } from 'app/shared/model/common/nhom-phan-loai.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface INhomPhanLoaiDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class NhomPhanLoaiDetail extends React.Component<INhomPhanLoaiDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { nhomPhanLoaiEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="gatewayApp.commonNhomPhanLoai.detail.title">NhomPhanLoai</Translate> [<b>{nhomPhanLoaiEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="nhomPhanLoaiCode">
                <Translate contentKey="gatewayApp.commonNhomPhanLoai.nhomPhanLoaiCode">Nhom Phan Loai Code</Translate>
              </span>
            </dt>
            <dd>{nhomPhanLoaiEntity.nhomPhanLoaiCode}</dd>
            <dt>
              <span id="name">
                <Translate contentKey="gatewayApp.commonNhomPhanLoai.name">Name</Translate>
              </span>
            </dt>
            <dd>{nhomPhanLoaiEntity.name}</dd>
            <dt>
              <span id="status">
                <Translate contentKey="gatewayApp.commonNhomPhanLoai.status">Status</Translate>
              </span>
            </dt>
            <dd>{nhomPhanLoaiEntity.status}</dd>
            <dt>
              <Translate contentKey="gatewayApp.commonNhomPhanLoai.donvitinh">Donvitinh</Translate>
            </dt>
            <dd>{nhomPhanLoaiEntity.donvitinhDonViTinhCode ? nhomPhanLoaiEntity.donvitinhDonViTinhCode : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/nhom-phan-loai" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/nhom-phan-loai/${nhomPhanLoaiEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ nhomPhanLoai }: IRootState) => ({
  nhomPhanLoaiEntity: nhomPhanLoai.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NhomPhanLoaiDetail);
