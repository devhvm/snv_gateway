import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './don-vi.reducer';
import { IDonVi } from 'app/shared/model/common/don-vi.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IDonViDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class DonViDetail extends React.Component<IDonViDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { donViEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="gatewayApp.commonDonVi.detail.title">DonVi</Translate> [<b>{donViEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="donViCode">
                <Translate contentKey="gatewayApp.commonDonVi.donViCode">Don Vi Code</Translate>
              </span>
            </dt>
            <dd>{donViEntity.donViCode}</dd>
            <dt>
              <span id="name">
                <Translate contentKey="gatewayApp.commonDonVi.name">Name</Translate>
              </span>
            </dt>
            <dd>{donViEntity.name}</dd>
            <dt>
              <span id="userName">
                <Translate contentKey="gatewayApp.commonDonVi.userName">User Name</Translate>
              </span>
            </dt>
            <dd>{donViEntity.userName}</dd>
            <dt>
              <span id="createTime">
                <Translate contentKey="gatewayApp.commonDonVi.createTime">Create Time</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={donViEntity.createTime} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="updateTime">
                <Translate contentKey="gatewayApp.commonDonVi.updateTime">Update Time</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={donViEntity.updateTime} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="status">
                <Translate contentKey="gatewayApp.commonDonVi.status">Status</Translate>
              </span>
            </dt>
            <dd>{donViEntity.status}</dd>
            <dt>
              <span id="program">
                <Translate contentKey="gatewayApp.commonDonVi.program">Program</Translate>
              </span>
            </dt>
            <dd>{donViEntity.program}</dd>
            <dt>
              <Translate contentKey="gatewayApp.commonDonVi.phamvi">Phamvi</Translate>
            </dt>
            <dd>{donViEntity.phamviId ? donViEntity.phamviId : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/don-vi" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/don-vi/${donViEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ donVi }: IRootState) => ({
  donViEntity: donVi.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DonViDetail);
