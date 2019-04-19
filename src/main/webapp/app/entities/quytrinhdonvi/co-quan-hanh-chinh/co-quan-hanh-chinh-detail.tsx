import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './co-quan-hanh-chinh.reducer';
import { ICoQuanHanhChinh } from 'app/shared/model/quytrinhdonvi/co-quan-hanh-chinh.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICoQuanHanhChinhDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class CoQuanHanhChinhDetail extends React.Component<ICoQuanHanhChinhDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { coQuanHanhChinhEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="gatewayApp.quytrinhdonviCoQuanHanhChinh.detail.title">CoQuanHanhChinh</Translate> [
            <b>{coQuanHanhChinhEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="coQuanHanhChinhCode">
                <Translate contentKey="gatewayApp.quytrinhdonviCoQuanHanhChinh.coQuanHanhChinhCode">Co Quan Hanh Chinh Code</Translate>
              </span>
            </dt>
            <dd>{coQuanHanhChinhEntity.coQuanHanhChinhCode}</dd>
            <dt>
              <span id="name">
                <Translate contentKey="gatewayApp.quytrinhdonviCoQuanHanhChinh.name">Name</Translate>
              </span>
            </dt>
            <dd>{coQuanHanhChinhEntity.name}</dd>
            <dt>
              <span id="description">
                <Translate contentKey="gatewayApp.quytrinhdonviCoQuanHanhChinh.description">Description</Translate>
              </span>
            </dt>
            <dd>{coQuanHanhChinhEntity.description}</dd>
            <dt>
              <span id="maDinhDanhCode">
                <Translate contentKey="gatewayApp.quytrinhdonviCoQuanHanhChinh.maDinhDanhCode">Ma Dinh Danh Code</Translate>
              </span>
            </dt>
            <dd>{coQuanHanhChinhEntity.maDinhDanhCode}</dd>
            <dt>
              <span id="level">
                <Translate contentKey="gatewayApp.quytrinhdonviCoQuanHanhChinh.level">Level</Translate>
              </span>
            </dt>
            <dd>{coQuanHanhChinhEntity.level}</dd>
            <dt>
              <span id="status">
                <Translate contentKey="gatewayApp.quytrinhdonviCoQuanHanhChinh.status">Status</Translate>
              </span>
            </dt>
            <dd>{coQuanHanhChinhEntity.status}</dd>
          </dl>
          <Button tag={Link} to="/entity/co-quan-hanh-chinh" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/co-quan-hanh-chinh/${coQuanHanhChinhEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ coQuanHanhChinh }: IRootState) => ({
  coQuanHanhChinhEntity: coQuanHanhChinh.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CoQuanHanhChinhDetail);
