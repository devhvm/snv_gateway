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
import { getEntity, updateEntity, createEntity, reset } from './nhom-phan-loai.reducer';
import { INhomPhanLoai } from 'app/shared/model/common/nhom-phan-loai.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface INhomPhanLoaiUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface INhomPhanLoaiUpdateState {
  isNew: boolean;
  donviId: string;
}

export class NhomPhanLoaiUpdate extends React.Component<INhomPhanLoaiUpdateProps, INhomPhanLoaiUpdateState> {
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
      const { nhomPhanLoaiEntity } = this.props;
      const entity = {
        ...nhomPhanLoaiEntity,
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
    this.props.history.push('/entity/nhom-phan-loai');
  };

  render() {
    const { nhomPhanLoaiEntity, donVis, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="gatewayApp.commonNhomPhanLoai.home.createOrEditLabel">
              <Translate contentKey="gatewayApp.commonNhomPhanLoai.home.createOrEditLabel">Create or edit a NhomPhanLoai</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : nhomPhanLoaiEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="nhom-phan-loai-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="nhomPhanLoaiCodeLabel" for="nhomPhanLoaiCode">
                    <Translate contentKey="gatewayApp.commonNhomPhanLoai.nhomPhanLoaiCode">Nhom Phan Loai Code</Translate>
                  </Label>
                  <AvField
                    id="nhom-phan-loai-nhomPhanLoaiCode"
                    type="text"
                    name="nhomPhanLoaiCode"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="nameLabel" for="name">
                    <Translate contentKey="gatewayApp.commonNhomPhanLoai.name">Name</Translate>
                  </Label>
                  <AvField
                    id="nhom-phan-loai-name"
                    type="text"
                    name="name"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="userNameLabel" for="userName">
                    <Translate contentKey="gatewayApp.commonNhomPhanLoai.userName">User Name</Translate>
                  </Label>
                  <AvField
                    id="nhom-phan-loai-userName"
                    type="text"
                    name="userName"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="createTimeLabel" for="createTime">
                    <Translate contentKey="gatewayApp.commonNhomPhanLoai.createTime">Create Time</Translate>
                  </Label>
                  <AvInput
                    id="nhom-phan-loai-createTime"
                    type="datetime-local"
                    className="form-control"
                    name="createTime"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.nhomPhanLoaiEntity.createTime)}
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="updateTimeLabel" for="updateTime">
                    <Translate contentKey="gatewayApp.commonNhomPhanLoai.updateTime">Update Time</Translate>
                  </Label>
                  <AvInput
                    id="nhom-phan-loai-updateTime"
                    type="datetime-local"
                    className="form-control"
                    name="updateTime"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.nhomPhanLoaiEntity.updateTime)}
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="statusLabel">
                    <Translate contentKey="gatewayApp.commonNhomPhanLoai.status">Status</Translate>
                  </Label>
                  <AvInput
                    id="nhom-phan-loai-status"
                    type="select"
                    className="form-control"
                    name="status"
                    value={(!isNew && nhomPhanLoaiEntity.status) || 'PUBLISH'}
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
                    <Translate contentKey="gatewayApp.commonNhomPhanLoai.program">Program</Translate>
                  </Label>
                  <AvField
                    id="nhom-phan-loai-program"
                    type="text"
                    name="program"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label for="donvi.id">
                    <Translate contentKey="gatewayApp.commonNhomPhanLoai.donvi">Donvi</Translate>
                  </Label>
                  <AvInput id="nhom-phan-loai-donvi" type="select" className="form-control" name="donviId">
                    <option value="" key="0" />
                    {donVis
                      ? donVis.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/nhom-phan-loai" replace color="info">
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
  nhomPhanLoaiEntity: storeState.nhomPhanLoai.entity,
  loading: storeState.nhomPhanLoai.loading,
  updating: storeState.nhomPhanLoai.updating,
  updateSuccess: storeState.nhomPhanLoai.updateSuccess
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
)(NhomPhanLoaiUpdate);
