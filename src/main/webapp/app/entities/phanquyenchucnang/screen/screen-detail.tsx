import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './screen.reducer';
import { IScreen } from 'app/shared/model/phanquyenchucnang/screen.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IScreenDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ScreenDetail extends React.Component<IScreenDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { screenEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="gatewayApp.phanquyenchucnangScreen.detail.title">Screen</Translate> [<b>{screenEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="screenCode">
                <Translate contentKey="gatewayApp.phanquyenchucnangScreen.screenCode">Screen Code</Translate>
              </span>
            </dt>
            <dd>{screenEntity.screenCode}</dd>
            <dt>
              <span id="name">
                <Translate contentKey="gatewayApp.phanquyenchucnangScreen.name">Name</Translate>
              </span>
            </dt>
            <dd>{screenEntity.name}</dd>
          </dl>
          <Button tag={Link} to="/entity/screen" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/screen/${screenEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ screen }: IRootState) => ({
  screenEntity: screen.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScreenDetail);
