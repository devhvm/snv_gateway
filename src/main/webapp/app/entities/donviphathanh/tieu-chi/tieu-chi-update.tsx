import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IKyCongBo } from 'app/shared/model/donviphathanh/ky-cong-bo.model';
import { getEntities as getKyCongBos } from 'app/entities/donviphathanh/ky-cong-bo/ky-cong-bo.reducer';
import { getEntity, updateEntity, createEntity, reset } from './tieu-chi.reducer';
import { ITieuChi } from 'app/shared/model/donviphathanh/tieu-chi.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ITieuChiUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface ITieuChiUpdateState {
  isNew: boolean;
  kycongboId: string;
}

export class TieuChiUpdate extends React.Component<ITieuChiUpdateProps, ITieuChiUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      kycongboId: '0',
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

    this.props.getKyCongBos();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { tieuChiEntity } = this.props;
      const entity = {
        ...tieuChiEntity,
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
    this.props.history.push('/entity/tieu-chi');
  };

  render() {
    const { tieuChiEntity, kyCongBos, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="gatewayApp.donviphathanhTieuChi.home.createOrEditLabel">
              <Translate contentKey="gatewayApp.donviphathanhTieuChi.home.createOrEditLabel">Create or edit a TieuChi</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : tieuChiEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="tieu-chi-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="nameLabel" for="name">
                    <Translate contentKey="gatewayApp.donviphathanhTieuChi.name">Name</Translate>
                  </Label>
                  <AvField
                    id="tieu-chi-name"
                    type="text"
                    name="name"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="statusLabel">
                    <Translate contentKey="gatewayApp.donviphathanhTieuChi.status">Status</Translate>
                  </Label>
                  <AvInput
                    id="tieu-chi-status"
                    type="select"
                    className="form-control"
                    name="status"
                    value={(!isNew && tieuChiEntity.status) || 'NEW'}
                  >
                    <option value="NEW">
                      <Translate contentKey="gatewayApp.ReportStatus.NEW" />
                    </option>
                    <option value="ACTIVED">
                      <Translate contentKey="gatewayApp.ReportStatus.ACTIVED" />
                    </option>
                    <option value="CANCELLED">
                      <Translate contentKey="gatewayApp.ReportStatus.CANCELLED" />
                    </option>
                    <option value="DELETED">
                      <Translate contentKey="gatewayApp.ReportStatus.DELETED" />
                    </option>
                    <option value="SIGNED">
                      <Translate contentKey="gatewayApp.ReportStatus.SIGNED" />
                    </option>
                    <option value="COMPLETED">
                      <Translate contentKey="gatewayApp.ReportStatus.COMPLETED" />
                    </option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="kycongbo.id">
                    <Translate contentKey="gatewayApp.donviphathanhTieuChi.kycongbo">Kycongbo</Translate>
                  </Label>
                  <AvInput id="tieu-chi-kycongbo" type="select" className="form-control" name="kycongboId">
                    <option value="" key="0" />
                    {kyCongBos
                      ? kyCongBos.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/tieu-chi" replace color="info">
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
  kyCongBos: storeState.kyCongBo.entities,
  tieuChiEntity: storeState.tieuChi.entity,
  loading: storeState.tieuChi.loading,
  updating: storeState.tieuChi.updating,
  updateSuccess: storeState.tieuChi.updateSuccess
});

const mapDispatchToProps = {
  getKyCongBos,
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
)(TieuChiUpdate);
