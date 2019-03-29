import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './pham-vi.reducer';
import { IPhamVi } from 'app/shared/model/common/pham-vi.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPhamViDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class PhamViDetail extends React.Component<IPhamViDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { phamViEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="gatewayApp.commonPhamVi.detail.title">PhamVi</Translate> [<b>{phamViEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="begin">
                <Translate contentKey="gatewayApp.commonPhamVi.begin">Begin</Translate>
              </span>
            </dt>
            <dd>{phamViEntity.begin}</dd>
            <dt>
              <span id="end">
                <Translate contentKey="gatewayApp.commonPhamVi.end">End</Translate>
              </span>
            </dt>
            <dd>{phamViEntity.end}</dd>
            <dt>
              <span id="userName">
                <Translate contentKey="gatewayApp.commonPhamVi.userName">User Name</Translate>
              </span>
            </dt>
            <dd>{phamViEntity.userName}</dd>
            <dt>
              <span id="createTime">
                <Translate contentKey="gatewayApp.commonPhamVi.createTime">Create Time</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={phamViEntity.createTime} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="updateTime">
                <Translate contentKey="gatewayApp.commonPhamVi.updateTime">Update Time</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={phamViEntity.updateTime} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="status">
                <Translate contentKey="gatewayApp.commonPhamVi.status">Status</Translate>
              </span>
            </dt>
            <dd>{phamViEntity.status}</dd>
            <dt>
              <span id="program">
                <Translate contentKey="gatewayApp.commonPhamVi.program">Program</Translate>
              </span>
            </dt>
            <dd>{phamViEntity.program}</dd>
          </dl>
          <Button tag={Link} to="/entity/pham-vi" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/pham-vi/${phamViEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ phamVi }: IRootState) => ({
  phamViEntity: phamVi.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PhamViDetail);
