import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './don-vi-tinh.reducer';
import { IDonViTinh } from 'app/shared/model/common/don-vi-tinh.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IDonViTinhDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class DonViTinhDetail extends React.Component<IDonViTinhDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { donViTinhEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="gatewayApp.commonDonViTinh.detail.title">DonViTinh</Translate> [<b>{donViTinhEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="donViTinhCode">
                <Translate contentKey="gatewayApp.commonDonViTinh.donViTinhCode">Don Vi Tinh Code</Translate>
              </span>
            </dt>
            <dd>{donViTinhEntity.donViTinhCode}</dd>
            <dt>
              <span id="name">
                <Translate contentKey="gatewayApp.commonDonViTinh.name">Name</Translate>
              </span>
            </dt>
            <dd>{donViTinhEntity.name}</dd>
            <dt>
              <span id="status">
                <Translate contentKey="gatewayApp.commonDonViTinh.status">Status</Translate>
              </span>
            </dt>
            <dd>{donViTinhEntity.status}</dd>
          </dl>
          <Button tag={Link} to="/entity/don-vi-tinh" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/don-vi-tinh/${donViTinhEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ donViTinh }: IRootState) => ({
  donViTinhEntity: donViTinh.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DonViTinhDetail);