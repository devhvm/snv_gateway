import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './chi-tieu.reducer';
import { IChiTieu } from 'app/shared/model/common/chi-tieu.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IChiTieuDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ChiTieuDetail extends React.Component<IChiTieuDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { chiTieuEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="gatewayApp.commonChiTieu.detail.title">ChiTieu</Translate> [<b>{chiTieuEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="chiTieuCode">
                <Translate contentKey="gatewayApp.commonChiTieu.chiTieuCode">Chi Tieu Code</Translate>
              </span>
            </dt>
            <dd>{chiTieuEntity.chiTieuCode}</dd>
            <dt>
              <span id="name">
                <Translate contentKey="gatewayApp.commonChiTieu.name">Name</Translate>
              </span>
            </dt>
            <dd>{chiTieuEntity.name}</dd>
            <dt>
              <span id="userName">
                <Translate contentKey="gatewayApp.commonChiTieu.userName">User Name</Translate>
              </span>
            </dt>
            <dd>{chiTieuEntity.userName}</dd>
            <dt>
              <span id="createTime">
                <Translate contentKey="gatewayApp.commonChiTieu.createTime">Create Time</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={chiTieuEntity.createTime} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="updateTime">
                <Translate contentKey="gatewayApp.commonChiTieu.updateTime">Update Time</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={chiTieuEntity.updateTime} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="status">
                <Translate contentKey="gatewayApp.commonChiTieu.status">Status</Translate>
              </span>
            </dt>
            <dd>{chiTieuEntity.status}</dd>
            <dt>
              <span id="program">
                <Translate contentKey="gatewayApp.commonChiTieu.program">Program</Translate>
              </span>
            </dt>
            <dd>{chiTieuEntity.program}</dd>
            <dt>
              <Translate contentKey="gatewayApp.commonChiTieu.nhomchitieu">Nhomchitieu</Translate>
            </dt>
            <dd>{chiTieuEntity.nhomchitieuId ? chiTieuEntity.nhomchitieuId : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/chi-tieu" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/chi-tieu/${chiTieuEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ chiTieu }: IRootState) => ({
  chiTieuEntity: chiTieu.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChiTieuDetail);
