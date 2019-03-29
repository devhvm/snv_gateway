import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
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
              <span id="userName">
                <Translate contentKey="gatewayApp.commonNhomPhanLoai.userName">User Name</Translate>
              </span>
            </dt>
            <dd>{nhomPhanLoaiEntity.userName}</dd>
            <dt>
              <span id="createTime">
                <Translate contentKey="gatewayApp.commonNhomPhanLoai.createTime">Create Time</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={nhomPhanLoaiEntity.createTime} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="updateTime">
                <Translate contentKey="gatewayApp.commonNhomPhanLoai.updateTime">Update Time</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={nhomPhanLoaiEntity.updateTime} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="status">
                <Translate contentKey="gatewayApp.commonNhomPhanLoai.status">Status</Translate>
              </span>
            </dt>
            <dd>{nhomPhanLoaiEntity.status}</dd>
            <dt>
              <span id="program">
                <Translate contentKey="gatewayApp.commonNhomPhanLoai.program">Program</Translate>
              </span>
            </dt>
            <dd>{nhomPhanLoaiEntity.program}</dd>
            <dt>
              <Translate contentKey="gatewayApp.commonNhomPhanLoai.donvi">Donvi</Translate>
            </dt>
            <dd>{nhomPhanLoaiEntity.donviId ? nhomPhanLoaiEntity.donviId : ''}</dd>
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
