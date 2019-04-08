import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './doi-tuong.reducer';
import { IDoiTuong } from 'app/shared/model/common/doi-tuong.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IDoiTuongDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class DoiTuongDetail extends React.Component<IDoiTuongDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { doiTuongEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="gatewayApp.commonDoiTuong.detail.title">DoiTuong</Translate> [<b>{doiTuongEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="doiTuongCode">
                <Translate contentKey="gatewayApp.commonDoiTuong.doiTuongCode">Doi Tuong Code</Translate>
              </span>
            </dt>
            <dd>{doiTuongEntity.doiTuongCode}</dd>
            <dt>
              <span id="name">
                <Translate contentKey="gatewayApp.commonDoiTuong.name">Name</Translate>
              </span>
            </dt>
            <dd>{doiTuongEntity.name}</dd>
            <dt>
              <span id="status">
                <Translate contentKey="gatewayApp.commonDoiTuong.status">Status</Translate>
              </span>
            </dt>
            <dd>{doiTuongEntity.status}</dd>
            <dt>
              <Translate contentKey="gatewayApp.commonDoiTuong.nhomphanloai">Nhomphanloai</Translate>
            </dt>
            <dd>{doiTuongEntity.nhomphanloaiNhomPhanLoaiCode ? doiTuongEntity.nhomphanloaiNhomPhanLoaiCode : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/doi-tuong" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/doi-tuong/${doiTuongEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ doiTuong }: IRootState) => ({
  doiTuongEntity: doiTuong.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DoiTuongDetail);
