import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './danh-muc.reducer';
import { IDanhMuc } from 'app/shared/model/common/danh-muc.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IDanhMucUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IDanhMucUpdateState {
  isNew: boolean;
}

export class DanhMucUpdate extends React.Component<IDanhMucUpdateProps, IDanhMucUpdateState> {
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
    values.createTime = convertDateTimeToServer(values.createTime);
    values.updateTime = convertDateTimeToServer(values.updateTime);

    if (errors.length === 0) {
      const { danhMucEntity } = this.props;
      const entity = {
        ...danhMucEntity,
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
    this.props.history.push('/entity/danh-muc');
  };

  render() {
    const { danhMucEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="gatewayApp.commonDanhMuc.home.createOrEditLabel">
              <Translate contentKey="gatewayApp.commonDanhMuc.home.createOrEditLabel">Create or edit a DanhMuc</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : danhMucEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="danh-muc-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="danhMucCodeLabel" for="danhMucCode">
                    <Translate contentKey="gatewayApp.commonDanhMuc.danhMucCode">Danh Muc Code</Translate>
                  </Label>
                  <AvField
                    id="danh-muc-danhMucCode"
                    type="text"
                    name="danhMucCode"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="nameLabel" for="name">
                    <Translate contentKey="gatewayApp.commonDanhMuc.name">Name</Translate>
                  </Label>
                  <AvField
                    id="danh-muc-name"
                    type="text"
                    name="name"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="userNameLabel" for="userName">
                    <Translate contentKey="gatewayApp.commonDanhMuc.userName">User Name</Translate>
                  </Label>
                  <AvField
                    id="danh-muc-userName"
                    type="text"
                    name="userName"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="createTimeLabel" for="createTime">
                    <Translate contentKey="gatewayApp.commonDanhMuc.createTime">Create Time</Translate>
                  </Label>
                  <AvInput
                    id="danh-muc-createTime"
                    type="datetime-local"
                    className="form-control"
                    name="createTime"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.danhMucEntity.createTime)}
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="updateTimeLabel" for="updateTime">
                    <Translate contentKey="gatewayApp.commonDanhMuc.updateTime">Update Time</Translate>
                  </Label>
                  <AvInput
                    id="danh-muc-updateTime"
                    type="datetime-local"
                    className="form-control"
                    name="updateTime"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.danhMucEntity.updateTime)}
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="statusLabel">
                    <Translate contentKey="gatewayApp.commonDanhMuc.status">Status</Translate>
                  </Label>
                  <AvInput
                    id="danh-muc-status"
                    type="select"
                    className="form-control"
                    name="status"
                    value={(!isNew && danhMucEntity.status) || 'PUBLISH'}
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
                    <Translate contentKey="gatewayApp.commonDanhMuc.program">Program</Translate>
                  </Label>
                  <AvField
                    id="danh-muc-program"
                    type="text"
                    name="program"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/danh-muc" replace color="info">
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
  danhMucEntity: storeState.danhMuc.entity,
  loading: storeState.danhMuc.loading,
  updating: storeState.danhMuc.updating,
  updateSuccess: storeState.danhMuc.updateSuccess
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
)(DanhMucUpdate);
