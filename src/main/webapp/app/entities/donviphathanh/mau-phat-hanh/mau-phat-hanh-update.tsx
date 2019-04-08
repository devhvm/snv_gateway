import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IPhamVi } from 'app/shared/model/donviphathanh/pham-vi.model';
import { getEntities as getPhamVis } from 'app/entities/donviphathanh/pham-vi/pham-vi.reducer';
import { getEntity, updateEntity, createEntity, reset } from './mau-phat-hanh.reducer';
import { IMauPhatHanh } from 'app/shared/model/donviphathanh/mau-phat-hanh.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IMauPhatHanhUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IMauPhatHanhUpdateState {
  isNew: boolean;
  phamviId: string;
}

export class MauPhatHanhUpdate extends React.Component<IMauPhatHanhUpdateProps, IMauPhatHanhUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      phamviId: '0',
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

    this.props.getPhamVis();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { mauPhatHanhEntity } = this.props;
      const entity = {
        ...mauPhatHanhEntity,
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
    this.props.history.push('/entity/mau-phat-hanh');
  };

  render() {
    const { mauPhatHanhEntity, phamVis, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="gatewayApp.donviphathanhMauPhatHanh.home.createOrEditLabel">
              <Translate contentKey="gatewayApp.donviphathanhMauPhatHanh.home.createOrEditLabel">Create or edit a MauPhatHanh</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : mauPhatHanhEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="mau-phat-hanh-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="mauPhatHanhCodeLabel" for="mauPhatHanhCode">
                    <Translate contentKey="gatewayApp.donviphathanhMauPhatHanh.mauPhatHanhCode">Mau Phat Hanh Code</Translate>
                  </Label>
                  <AvField
                    id="mau-phat-hanh-mauPhatHanhCode"
                    type="text"
                    name="mauPhatHanhCode"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="nameLabel" for="name">
                    <Translate contentKey="gatewayApp.donviphathanhMauPhatHanh.name">Name</Translate>
                  </Label>
                  <AvField
                    id="mau-phat-hanh-name"
                    type="text"
                    name="name"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="statusLabel">
                    <Translate contentKey="gatewayApp.donviphathanhMauPhatHanh.status">Status</Translate>
                  </Label>
                  <AvInput
                    id="mau-phat-hanh-status"
                    type="select"
                    className="form-control"
                    name="status"
                    value={(!isNew && mauPhatHanhEntity.status) || 'NEW'}
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
                  <Label for="phamvi.mauPhatHanhCode">
                    <Translate contentKey="gatewayApp.donviphathanhMauPhatHanh.phamvi">Phamvi</Translate>
                  </Label>
                  <AvInput id="mau-phat-hanh-phamvi" type="select" className="form-control" name="phamviId">
                    <option value="" key="0" />
                    {phamVis
                      ? phamVis.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.mauPhatHanhCode}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/mau-phat-hanh" replace color="info">
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
  phamVis: storeState.phamVi.entities,
  mauPhatHanhEntity: storeState.mauPhatHanh.entity,
  loading: storeState.mauPhatHanh.loading,
  updating: storeState.mauPhatHanh.updating,
  updateSuccess: storeState.mauPhatHanh.updateSuccess
});

const mapDispatchToProps = {
  getPhamVis,
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
)(MauPhatHanhUpdate);
