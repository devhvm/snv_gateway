import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './noi-dung.reducer';
import { INoiDung } from 'app/shared/model/common/noi-dung.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface INoiDungDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class NoiDungDetail extends React.Component<INoiDungDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { noiDungEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="gatewayApp.commonNoiDung.detail.title">NoiDung</Translate> [<b>{noiDungEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="noiDungCode">
                <Translate contentKey="gatewayApp.commonNoiDung.noiDungCode">Noi Dung Code</Translate>
              </span>
            </dt>
            <dd>{noiDungEntity.noiDungCode}</dd>
            <dt>
              <span id="status">
                <Translate contentKey="gatewayApp.commonNoiDung.status">Status</Translate>
              </span>
            </dt>
            <dd>{noiDungEntity.status}</dd>
            <dt>
              <Translate contentKey="gatewayApp.commonNoiDung.nhomnoidung">Nhomnoidung</Translate>
            </dt>
            <dd>{noiDungEntity.nhomnoidungId ? noiDungEntity.nhomnoidungId : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/noi-dung" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/noi-dung/${noiDungEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ noiDung }: IRootState) => ({
  noiDungEntity: noiDung.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NoiDungDetail);
