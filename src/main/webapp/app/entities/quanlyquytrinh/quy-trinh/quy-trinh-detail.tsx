import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './quy-trinh.reducer';
import { IQuyTrinh } from 'app/shared/model/quanlyquytrinh/quy-trinh.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IQuyTrinhDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class QuyTrinhDetail extends React.Component<IQuyTrinhDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { quyTrinhEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="gatewayApp.quanlyquytrinhQuyTrinh.detail.title">QuyTrinh</Translate> [<b>{quyTrinhEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="quyTrinhCode">
                <Translate contentKey="gatewayApp.quanlyquytrinhQuyTrinh.quyTrinhCode">Quy Trinh Code</Translate>
              </span>
            </dt>
            <dd>{quyTrinhEntity.quyTrinhCode}</dd>
            <dt>
              <span id="name">
                <Translate contentKey="gatewayApp.quanlyquytrinhQuyTrinh.name">Name</Translate>
              </span>
            </dt>
            <dd>{quyTrinhEntity.name}</dd>
            <dt>
              <span id="icon">
                <Translate contentKey="gatewayApp.quanlyquytrinhQuyTrinh.icon">Icon</Translate>
              </span>
            </dt>
            <dd>{quyTrinhEntity.icon}</dd>
          </dl>
          <Button tag={Link} to="/entity/quy-trinh" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/quy-trinh/${quyTrinhEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ quyTrinh }: IRootState) => ({
  quyTrinhEntity: quyTrinh.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuyTrinhDetail);
