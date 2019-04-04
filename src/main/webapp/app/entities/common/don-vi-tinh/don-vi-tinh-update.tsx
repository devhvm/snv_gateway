import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './don-vi-tinh.reducer';
import { IDonViTinh } from 'app/shared/model/common/don-vi-tinh.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IDonViTinhUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IDonViTinhUpdateState {
  isNew: boolean;
}

export class DonViTinhUpdate extends React.Component<IDonViTinhUpdateProps, IDonViTinhUpdateState> {
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
      const { donViTinhEntity } = this.props;
      const entity = {
        ...donViTinhEntity,
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
    this.props.history.push('/entity/don-vi-tinh');
  };

  render() {
    const { donViTinhEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="gatewayApp.commonDonViTinh.home.createOrEditLabel">
              <Translate contentKey="gatewayApp.commonDonViTinh.home.createOrEditLabel">Create or edit a DonViTinh</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : donViTinhEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="don-vi-tinh-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="donViTinhCodeLabel" for="donViTinhCode">
                    <Translate contentKey="gatewayApp.commonDonViTinh.donViTinhCode">Don Vi Tinh Code</Translate>
                  </Label>
                  <AvField
                    id="don-vi-tinh-donViTinhCode"
                    type="text"
                    name="donViTinhCode"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="nameLabel" for="name">
                    <Translate contentKey="gatewayApp.commonDonViTinh.name">Name</Translate>
                  </Label>
                  <AvField
                    id="don-vi-tinh-name"
                    type="text"
                    name="name"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="statusLabel">
                    <Translate contentKey="gatewayApp.commonDonViTinh.status">Status</Translate>
                  </Label>
                  <AvInput
                    id="don-vi-tinh-status"
                    type="select"
                    className="form-control"
                    name="status"
                    value={(!isNew && donViTinhEntity.status) || 'PUBLISH'}
                  >
                    <option value="PUBLISH">
                      <Translate contentKey="gatewayApp.Status.PUBLISH" />
                    </option>
                    <option value="UNPUBLISH">
                      <Translate contentKey="gatewayApp.Status.UNPUBLISH" />
                    </option>
                    <option value="DELETED">
                      <Translate contentKey="gatewayApp.Status.DELETED" />
                    </option>
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/don-vi-tinh" replace color="info">
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
  donViTinhEntity: storeState.donViTinh.entity,
  loading: storeState.donViTinh.loading,
  updating: storeState.donViTinh.updating,
  updateSuccess: storeState.donViTinh.updateSuccess
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
)(DonViTinhUpdate);
