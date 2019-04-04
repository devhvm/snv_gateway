import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './nhom-noi-dung.reducer';
import { INhomNoiDung } from 'app/shared/model/common/nhom-noi-dung.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface INhomNoiDungDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class NhomNoiDungDetail extends React.Component<INhomNoiDungDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { nhomNoiDungEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="gatewayApp.commonNhomNoiDung.detail.title">NhomNoiDung</Translate> [<b>{nhomNoiDungEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="nhomNoiDungCode">
                <Translate contentKey="gatewayApp.commonNhomNoiDung.nhomNoiDungCode">Nhom Noi Dung Code</Translate>
              </span>
            </dt>
            <dd>{nhomNoiDungEntity.nhomNoiDungCode}</dd>
            <dt>
              <span id="name">
                <Translate contentKey="gatewayApp.commonNhomNoiDung.name">Name</Translate>
              </span>
            </dt>
            <dd>{nhomNoiDungEntity.name}</dd>
            <dt>
              <span id="status">
                <Translate contentKey="gatewayApp.commonNhomNoiDung.status">Status</Translate>
              </span>
            </dt>
            <dd>{nhomNoiDungEntity.status}</dd>
          </dl>
          <Button tag={Link} to="/entity/nhom-noi-dung" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/nhom-noi-dung/${nhomNoiDungEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ nhomNoiDung }: IRootState) => ({
  nhomNoiDungEntity: nhomNoiDung.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NhomNoiDungDetail);
