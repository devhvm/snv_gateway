import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './nhom-danh-muc.reducer';
import { INhomDanhMuc } from 'app/shared/model/common/nhom-danh-muc.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface INhomDanhMucUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface INhomDanhMucUpdateState {
  isNew: boolean;
}

export class NhomDanhMucUpdate extends React.Component<INhomDanhMucUpdateProps, INhomDanhMucUpdateState> {
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
      const { nhomDanhMucEntity } = this.props;
      const entity = {
        ...nhomDanhMucEntity,
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
    this.props.history.push('/entity/nhom-danh-muc');
  };

  render() {
    const { nhomDanhMucEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="gatewayApp.commonNhomDanhMuc.home.createOrEditLabel">
              <Translate contentKey="gatewayApp.commonNhomDanhMuc.home.createOrEditLabel">Create or edit a NhomDanhMuc</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : nhomDanhMucEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="nhom-danh-muc-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="nhomDanhMucCodeLabel" for="nhomDanhMucCode">
                    <Translate contentKey="gatewayApp.commonNhomDanhMuc.nhomDanhMucCode">Nhom Danh Muc Code</Translate>
                  </Label>
                  <AvField
                    id="nhom-danh-muc-nhomDanhMucCode"
                    type="text"
                    name="nhomDanhMucCode"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="nameLabel" for="name">
                    <Translate contentKey="gatewayApp.commonNhomDanhMuc.name">Name</Translate>
                  </Label>
                  <AvField
                    id="nhom-danh-muc-name"
                    type="text"
                    name="name"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="userNameLabel" for="userName">
                    <Translate contentKey="gatewayApp.commonNhomDanhMuc.userName">User Name</Translate>
                  </Label>
                  <AvField
                    id="nhom-danh-muc-userName"
                    type="text"
                    name="userName"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="createTimeLabel" for="createTime">
                    <Translate contentKey="gatewayApp.commonNhomDanhMuc.createTime">Create Time</Translate>
                  </Label>
                  <AvInput
                    id="nhom-danh-muc-createTime"
                    type="datetime-local"
                    className="form-control"
                    name="createTime"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.nhomDanhMucEntity.createTime)}
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="updateTimeLabel" for="updateTime">
                    <Translate contentKey="gatewayApp.commonNhomDanhMuc.updateTime">Update Time</Translate>
                  </Label>
                  <AvInput
                    id="nhom-danh-muc-updateTime"
                    type="datetime-local"
                    className="form-control"
                    name="updateTime"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.nhomDanhMucEntity.updateTime)}
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="statusLabel">
                    <Translate contentKey="gatewayApp.commonNhomDanhMuc.status">Status</Translate>
                  </Label>
                  <AvInput
                    id="nhom-danh-muc-status"
                    type="select"
                    className="form-control"
                    name="status"
                    value={(!isNew && nhomDanhMucEntity.status) || 'PUBLISH'}
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
                    <Translate contentKey="gatewayApp.commonNhomDanhMuc.program">Program</Translate>
                  </Label>
                  <AvField
                    id="nhom-danh-muc-program"
                    type="text"
                    name="program"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/nhom-danh-muc" replace color="info">
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
  nhomDanhMucEntity: storeState.nhomDanhMuc.entity,
  loading: storeState.nhomDanhMuc.loading,
  updating: storeState.nhomDanhMuc.updating,
  updateSuccess: storeState.nhomDanhMuc.updateSuccess
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
)(NhomDanhMucUpdate);
