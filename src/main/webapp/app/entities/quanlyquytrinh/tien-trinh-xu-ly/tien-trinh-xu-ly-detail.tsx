import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './tien-trinh-xu-ly.reducer';
import { ITienTrinhXuLy } from 'app/shared/model/quanlyquytrinh/tien-trinh-xu-ly.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITienTrinhXuLyDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class TienTrinhXuLyDetail extends React.Component<ITienTrinhXuLyDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { tienTrinhXuLyEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="gatewayApp.quanlyquytrinhTienTrinhXuLy.detail.title">TienTrinhXuLy</Translate> [
            <b>{tienTrinhXuLyEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="batdauCode">
                <Translate contentKey="gatewayApp.quanlyquytrinhTienTrinhXuLy.batdauCode">Batdau Code</Translate>
              </span>
            </dt>
            <dd>{tienTrinhXuLyEntity.batdauCode}</dd>
            <dt>
              <span id="ketThucCode">
                <Translate contentKey="gatewayApp.quanlyquytrinhTienTrinhXuLy.ketThucCode">Ket Thuc Code</Translate>
              </span>
            </dt>
            <dd>{tienTrinhXuLyEntity.ketThucCode}</dd>
            <dt>
              <Translate contentKey="gatewayApp.quanlyquytrinhTienTrinhXuLy.tienTrinh">Tien Trinh</Translate>
            </dt>
            <dd>{tienTrinhXuLyEntity.tienTrinhName ? tienTrinhXuLyEntity.tienTrinhName : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/tien-trinh-xu-ly" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/tien-trinh-xu-ly/${tienTrinhXuLyEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ tienTrinhXuLy }: IRootState) => ({
  tienTrinhXuLyEntity: tienTrinhXuLy.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TienTrinhXuLyDetail);
