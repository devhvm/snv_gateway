import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './ky-cong-bo.reducer';
import { IKyCongBo } from 'app/shared/model/donviphathanh/ky-cong-bo.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IKyCongBoUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IKyCongBoUpdateState {
  isNew: boolean;
}

export class KyCongBoUpdate extends React.Component<IKyCongBoUpdateProps, IKyCongBoUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
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
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { kyCongBoEntity } = this.props;
      const entity = {
        ...kyCongBoEntity,
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
    this.props.history.push('/entity/ky-cong-bo');
  };

  render() {
    const { kyCongBoEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="gatewayApp.donviphathanhKyCongBo.home.createOrEditLabel">
              <Translate contentKey="gatewayApp.donviphathanhKyCongBo.home.createOrEditLabel">Create or edit a KyCongBo</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : kyCongBoEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="ky-cong-bo-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="kyCongBoCodeLabel" for="kyCongBoCode">
                    <Translate contentKey="gatewayApp.donviphathanhKyCongBo.kyCongBoCode">Ky Cong Bo Code</Translate>
                  </Label>
                  <AvField
                    id="ky-cong-bo-kyCongBoCode"
                    type="text"
                    name="kyCongBoCode"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="nameLabel" for="name">
                    <Translate contentKey="gatewayApp.donviphathanhKyCongBo.name">Name</Translate>
                  </Label>
                  <AvField
                    id="ky-cong-bo-name"
                    type="text"
                    name="name"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="statusLabel">
                    <Translate contentKey="gatewayApp.donviphathanhKyCongBo.status">Status</Translate>
                  </Label>
                  <AvInput
                    id="ky-cong-bo-status"
                    type="select"
                    className="form-control"
                    name="status"
                    value={(!isNew && kyCongBoEntity.status) || 'NEW'}
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
                <Button tag={Link} id="cancel-save" to="/entity/ky-cong-bo" replace color="info">
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
  kyCongBoEntity: storeState.kyCongBo.entity,
  loading: storeState.kyCongBo.loading,
  updating: storeState.kyCongBo.updating,
  updateSuccess: storeState.kyCongBo.updateSuccess
});

const mapDispatchToProps = {
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
)(KyCongBoUpdate);
