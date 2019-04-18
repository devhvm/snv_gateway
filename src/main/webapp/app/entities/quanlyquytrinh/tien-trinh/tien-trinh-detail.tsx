import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './tien-trinh.reducer';
import { ITienTrinh } from 'app/shared/model/quanlyquytrinh/tien-trinh.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITienTrinhDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class TienTrinhDetail extends React.Component<ITienTrinhDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { tienTrinhEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="gatewayApp.quanlyquytrinhTienTrinh.detail.title">TienTrinh</Translate> [<b>{tienTrinhEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="menuItemCode">
                <Translate contentKey="gatewayApp.quanlyquytrinhTienTrinh.menuItemCode">Menu Item Code</Translate>
              </span>
            </dt>
            <dd>{tienTrinhEntity.menuItemCode}</dd>
            <dt>
              <span id="name">
                <Translate contentKey="gatewayApp.quanlyquytrinhTienTrinh.name">Name</Translate>
              </span>
            </dt>
            <dd>{tienTrinhEntity.name}</dd>
            <dt>
              <span id="icon">
                <Translate contentKey="gatewayApp.quanlyquytrinhTienTrinh.icon">Icon</Translate>
              </span>
            </dt>
            <dd>{tienTrinhEntity.icon}</dd>
            <dt>
              <Translate contentKey="gatewayApp.quanlyquytrinhTienTrinh.quyTrinh">Quy Trinh</Translate>
            </dt>
            <dd>{tienTrinhEntity.quyTrinhName ? tienTrinhEntity.quyTrinhName : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/tien-trinh" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/tien-trinh/${tienTrinhEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ tienTrinh }: IRootState) => ({
  tienTrinhEntity: tienTrinh.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TienTrinhDetail);
