import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './quy-trinh-don-vi.reducer';
import { IQuyTrinhDonVi } from 'app/shared/model/quytrinhdonvi/quy-trinh-don-vi.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IQuyTrinhDonViDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class QuyTrinhDonViDetail extends React.Component<IQuyTrinhDonViDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { quyTrinhDonViEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="gatewayApp.quytrinhdonviQuyTrinhDonVi.detail.title">QuyTrinhDonVi</Translate> [
            <b>{quyTrinhDonViEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="quyTrinhCode">
                <Translate contentKey="gatewayApp.quytrinhdonviQuyTrinhDonVi.quyTrinhCode">Quy Trinh Code</Translate>
              </span>
            </dt>
            <dd>{quyTrinhDonViEntity.quyTrinhCode}</dd>
            <dt>
              <span id="name">
                <Translate contentKey="gatewayApp.quytrinhdonviQuyTrinhDonVi.name">Name</Translate>
              </span>
            </dt>
            <dd>{quyTrinhDonViEntity.name}</dd>
            <dt>
              <Translate contentKey="gatewayApp.quytrinhdonviQuyTrinhDonVi.coQuanHanhChinh">Co Quan Hanh Chinh</Translate>
            </dt>
            <dd>{quyTrinhDonViEntity.coQuanHanhChinhName ? quyTrinhDonViEntity.coQuanHanhChinhName : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/quy-trinh-don-vi" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/quy-trinh-don-vi/${quyTrinhDonViEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ quyTrinhDonVi }: IRootState) => ({
  quyTrinhDonViEntity: quyTrinhDonVi.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuyTrinhDonViDetail);
