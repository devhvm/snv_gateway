import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './nhom-danh-muc.reducer';
import { INhomDanhMuc } from 'app/shared/model/common/nhom-danh-muc.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface INhomDanhMucDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class NhomDanhMucDetail extends React.Component<INhomDanhMucDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { nhomDanhMucEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="gatewayApp.commonNhomDanhMuc.detail.title">NhomDanhMuc</Translate> [<b>{nhomDanhMucEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="nhomDanhMucCode">
                <Translate contentKey="gatewayApp.commonNhomDanhMuc.nhomDanhMucCode">Nhom Danh Muc Code</Translate>
              </span>
            </dt>
            <dd>{nhomDanhMucEntity.nhomDanhMucCode}</dd>
            <dt>
              <span id="name">
                <Translate contentKey="gatewayApp.commonNhomDanhMuc.name">Name</Translate>
              </span>
            </dt>
            <dd>{nhomDanhMucEntity.name}</dd>
            <dt>
              <span id="userName">
                <Translate contentKey="gatewayApp.commonNhomDanhMuc.userName">User Name</Translate>
              </span>
            </dt>
            <dd>{nhomDanhMucEntity.userName}</dd>
            <dt>
              <span id="createTime">
                <Translate contentKey="gatewayApp.commonNhomDanhMuc.createTime">Create Time</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={nhomDanhMucEntity.createTime} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="updateTime">
                <Translate contentKey="gatewayApp.commonNhomDanhMuc.updateTime">Update Time</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={nhomDanhMucEntity.updateTime} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="status">
                <Translate contentKey="gatewayApp.commonNhomDanhMuc.status">Status</Translate>
              </span>
            </dt>
            <dd>{nhomDanhMucEntity.status}</dd>
            <dt>
              <span id="program">
                <Translate contentKey="gatewayApp.commonNhomDanhMuc.program">Program</Translate>
              </span>
            </dt>
            <dd>{nhomDanhMucEntity.program}</dd>
          </dl>
          <Button tag={Link} to="/entity/nhom-danh-muc" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/nhom-danh-muc/${nhomDanhMucEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ nhomDanhMuc }: IRootState) => ({
  nhomDanhMucEntity: nhomDanhMuc.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NhomDanhMucDetail);
