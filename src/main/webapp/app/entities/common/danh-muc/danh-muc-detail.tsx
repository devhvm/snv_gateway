import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './danh-muc.reducer';
import { IDanhMuc } from 'app/shared/model/common/danh-muc.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IDanhMucDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class DanhMucDetail extends React.Component<IDanhMucDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { danhMucEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="gatewayApp.commonDanhMuc.detail.title">DanhMuc</Translate> [<b>{danhMucEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="danhMucCode">
                <Translate contentKey="gatewayApp.commonDanhMuc.danhMucCode">Danh Muc Code</Translate>
              </span>
            </dt>
            <dd>{danhMucEntity.danhMucCode}</dd>
            <dt>
              <span id="name">
                <Translate contentKey="gatewayApp.commonDanhMuc.name">Name</Translate>
              </span>
            </dt>
            <dd>{danhMucEntity.name}</dd>
            <dt>
              <span id="userName">
                <Translate contentKey="gatewayApp.commonDanhMuc.userName">User Name</Translate>
              </span>
            </dt>
            <dd>{danhMucEntity.userName}</dd>
            <dt>
              <span id="createTime">
                <Translate contentKey="gatewayApp.commonDanhMuc.createTime">Create Time</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={danhMucEntity.createTime} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="updateTime">
                <Translate contentKey="gatewayApp.commonDanhMuc.updateTime">Update Time</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={danhMucEntity.updateTime} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="status">
                <Translate contentKey="gatewayApp.commonDanhMuc.status">Status</Translate>
              </span>
            </dt>
            <dd>{danhMucEntity.status}</dd>
            <dt>
              <span id="program">
                <Translate contentKey="gatewayApp.commonDanhMuc.program">Program</Translate>
              </span>
            </dt>
            <dd>{danhMucEntity.program}</dd>
          </dl>
          <Button tag={Link} to="/entity/danh-muc" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/danh-muc/${danhMucEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ danhMuc }: IRootState) => ({
  danhMucEntity: danhMuc.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DanhMucDetail);
