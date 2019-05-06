import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IQuyTrinhDonVi } from 'app/shared/model/quytrinhdonvi/quy-trinh-don-vi.model';
import { getEntities as getQuyTrinhDonVis } from 'app/entities/quytrinhdonvi/quy-trinh-don-vi/quy-trinh-don-vi.reducer';
import { getEntity, updateEntity, createEntity, reset } from './du-lieu-tien-trinh.reducer';
import { IDuLieuTienTrinh } from 'app/shared/model/quytrinhdonvi/du-lieu-tien-trinh.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IDuLieuTienTrinhUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IDuLieuTienTrinhUpdateState {
  isNew: boolean;
  quyTrinhDonViId: string;
}

export class DuLieuTienTrinhUpdate extends React.Component<IDuLieuTienTrinhUpdateProps, IDuLieuTienTrinhUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      quyTrinhDonViId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getQuyTrinhDonVis();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { duLieuTienTrinhEntity } = this.props;
      const entity = {
        ...duLieuTienTrinhEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/du-lieu-tien-trinh');
  };

  render() {
    const { duLieuTienTrinhEntity, quyTrinhDonVis, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="gatewayApp.quytrinhdonviDuLieuTienTrinh.home.createOrEditLabel">
              <Translate contentKey="gatewayApp.quytrinhdonviDuLieuTienTrinh.home.createOrEditLabel">
                Create or edit a DuLieuTienTrinh
              </Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : duLieuTienTrinhEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="du-lieu-tien-trinh-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="tienTrinhCodeLabel" for="tienTrinhCode">
                    <Translate contentKey="gatewayApp.quytrinhdonviDuLieuTienTrinh.tienTrinhCode">Tien Trinh Code</Translate>
                  </Label>
                  <AvField
                    id="du-lieu-tien-trinh-tienTrinhCode"
                    type="text"
                    name="tienTrinhCode"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="duLieuCodeLabel" for="duLieuCode">
                    <Translate contentKey="gatewayApp.quytrinhdonviDuLieuTienTrinh.duLieuCode">Du Lieu Code</Translate>
                  </Label>
                  <AvField
                    id="du-lieu-tien-trinh-duLieuCode"
                    type="text"
                    name="duLieuCode"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="fromUserIdLabel" for="fromUserId">
                    <Translate contentKey="gatewayApp.quytrinhdonviDuLieuTienTrinh.fromUserId">From User Id</Translate>
                  </Label>
                  <AvField
                    id="du-lieu-tien-trinh-fromUserId"
                    type="text"
                    name="fromUserId"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="toUserIdLabel" for="toUserId">
                    <Translate contentKey="gatewayApp.quytrinhdonviDuLieuTienTrinh.toUserId">To User Id</Translate>
                  </Label>
                  <AvField
                    id="du-lieu-tien-trinh-toUserId"
                    type="text"
                    name="toUserId"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="nameLabel" for="name">
                    <Translate contentKey="gatewayApp.quytrinhdonviDuLieuTienTrinh.name">Name</Translate>
                  </Label>
                  <AvField
                    id="du-lieu-tien-trinh-name"
                    type="text"
                    name="name"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="statusLabel" for="status">
                    <Translate contentKey="gatewayApp.quytrinhdonviDuLieuTienTrinh.status">Status</Translate>
                  </Label>
                  <AvField
                    id="du-lieu-tien-trinh-status"
                    type="text"
                    name="status"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="noteLabel" for="note">
                    <Translate contentKey="gatewayApp.quytrinhdonviDuLieuTienTrinh.note">Note</Translate>
                  </Label>
                  <AvField
                    id="du-lieu-tien-trinh-note"
                    type="text"
                    name="note"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label for="quyTrinhDonVi.name">
                    <Translate contentKey="gatewayApp.quytrinhdonviDuLieuTienTrinh.quyTrinhDonVi">Quy Trinh Don Vi</Translate>
                  </Label>
                  <AvInput id="du-lieu-tien-trinh-quyTrinhDonVi" type="select" className="form-control" name="quyTrinhDonViId">
                    <option value="" key="0" />
                    {quyTrinhDonVis
                      ? quyTrinhDonVis.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.name}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/du-lieu-tien-trinh" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />
                  &nbsp;
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />
                  &nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  quyTrinhDonVis: storeState.quyTrinhDonVi.entities,
  duLieuTienTrinhEntity: storeState.duLieuTienTrinh.entity,
  loading: storeState.duLieuTienTrinh.loading,
  updating: storeState.duLieuTienTrinh.updating,
  updateSuccess: storeState.duLieuTienTrinh.updateSuccess
});

const mapDispatchToProps = {
  getQuyTrinhDonVis,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DuLieuTienTrinhUpdate);
