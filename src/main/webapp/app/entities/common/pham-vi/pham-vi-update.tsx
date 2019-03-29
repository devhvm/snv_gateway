import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IDonVi } from 'app/shared/model/common/don-vi.model';
import { getEntities as getDonVis } from 'app/entities/common/don-vi/don-vi.reducer';
import { getEntity, updateEntity, createEntity, reset } from './pham-vi.reducer';
import { IPhamVi } from 'app/shared/model/common/pham-vi.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPhamViUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IPhamViUpdateState {
  isNew: boolean;
  donviId: string;
}

export class PhamViUpdate extends React.Component<IPhamViUpdateProps, IPhamViUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      donviId: '0',
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

    this.props.getDonVis();
  }

  saveEntity = (event, errors, values) => {
    values.createTime = convertDateTimeToServer(values.createTime);
    values.updateTime = convertDateTimeToServer(values.updateTime);

    if (errors.length === 0) {
      const { phamViEntity } = this.props;
      const entity = {
        ...phamViEntity,
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
    this.props.history.push('/entity/pham-vi');
  };

  render() {
    const { phamViEntity, donVis, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="gatewayApp.commonPhamVi.home.createOrEditLabel">
              <Translate contentKey="gatewayApp.commonPhamVi.home.createOrEditLabel">Create or edit a PhamVi</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : phamViEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="pham-vi-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="beginLabel" for="begin">
                    <Translate contentKey="gatewayApp.commonPhamVi.begin">Begin</Translate>
                  </Label>
                  <AvField
                    id="pham-vi-begin"
                    type="text"
                    name="begin"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="endLabel" for="end">
                    <Translate contentKey="gatewayApp.commonPhamVi.end">End</Translate>
                  </Label>
                  <AvField
                    id="pham-vi-end"
                    type="text"
                    name="end"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="userNameLabel" for="userName">
                    <Translate contentKey="gatewayApp.commonPhamVi.userName">User Name</Translate>
                  </Label>
                  <AvField
                    id="pham-vi-userName"
                    type="text"
                    name="userName"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="createTimeLabel" for="createTime">
                    <Translate contentKey="gatewayApp.commonPhamVi.createTime">Create Time</Translate>
                  </Label>
                  <AvInput
                    id="pham-vi-createTime"
                    type="datetime-local"
                    className="form-control"
                    name="createTime"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.phamViEntity.createTime)}
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="updateTimeLabel" for="updateTime">
                    <Translate contentKey="gatewayApp.commonPhamVi.updateTime">Update Time</Translate>
                  </Label>
                  <AvInput
                    id="pham-vi-updateTime"
                    type="datetime-local"
                    className="form-control"
                    name="updateTime"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.phamViEntity.updateTime)}
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="statusLabel">
                    <Translate contentKey="gatewayApp.commonPhamVi.status">Status</Translate>
                  </Label>
                  <AvInput
                    id="pham-vi-status"
                    type="select"
                    className="form-control"
                    name="status"
                    value={(!isNew && phamViEntity.status) || 'PUBLISH'}
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
                <AvGroup>
                  <Label id="programLabel" for="program">
                    <Translate contentKey="gatewayApp.commonPhamVi.program">Program</Translate>
                  </Label>
                  <AvField
                    id="pham-vi-program"
                    type="text"
                    name="program"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/pham-vi" replace color="info">
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
  donVis: storeState.donVi.entities,
  phamViEntity: storeState.phamVi.entity,
  loading: storeState.phamVi.loading,
  updating: storeState.phamVi.updating,
  updateSuccess: storeState.phamVi.updateSuccess
});

const mapDispatchToProps = {
  getDonVis,
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
)(PhamViUpdate);
