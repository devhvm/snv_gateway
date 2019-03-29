import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { INhomPhanLoai } from 'app/shared/model/common/nhom-phan-loai.model';
import { getEntities as getNhomPhanLoais } from 'app/entities/common/nhom-phan-loai/nhom-phan-loai.reducer';
import { getEntity, updateEntity, createEntity, reset } from './doi-tuong.reducer';
import { IDoiTuong } from 'app/shared/model/common/doi-tuong.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IDoiTuongUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IDoiTuongUpdateState {
  isNew: boolean;
  nhomphanloaiId: string;
}

export class DoiTuongUpdate extends React.Component<IDoiTuongUpdateProps, IDoiTuongUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      nhomphanloaiId: '0',
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

    this.props.getNhomPhanLoais();
  }

  saveEntity = (event, errors, values) => {
    values.createTime = convertDateTimeToServer(values.createTime);
    values.updateTime = convertDateTimeToServer(values.updateTime);

    if (errors.length === 0) {
      const { doiTuongEntity } = this.props;
      const entity = {
        ...doiTuongEntity,
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
    this.props.history.push('/entity/doi-tuong');
  };

  render() {
    const { doiTuongEntity, nhomPhanLoais, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="gatewayApp.commonDoiTuong.home.createOrEditLabel">
              <Translate contentKey="gatewayApp.commonDoiTuong.home.createOrEditLabel">Create or edit a DoiTuong</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : doiTuongEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="doi-tuong-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="doiTuongCodeLabel" for="doiTuongCode">
                    <Translate contentKey="gatewayApp.commonDoiTuong.doiTuongCode">Doi Tuong Code</Translate>
                  </Label>
                  <AvField
                    id="doi-tuong-doiTuongCode"
                    type="text"
                    name="doiTuongCode"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="nameLabel" for="name">
                    <Translate contentKey="gatewayApp.commonDoiTuong.name">Name</Translate>
                  </Label>
                  <AvField
                    id="doi-tuong-name"
                    type="text"
                    name="name"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="userNameLabel" for="userName">
                    <Translate contentKey="gatewayApp.commonDoiTuong.userName">User Name</Translate>
                  </Label>
                  <AvField
                    id="doi-tuong-userName"
                    type="text"
                    name="userName"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="createTimeLabel" for="createTime">
                    <Translate contentKey="gatewayApp.commonDoiTuong.createTime">Create Time</Translate>
                  </Label>
                  <AvInput
                    id="doi-tuong-createTime"
                    type="datetime-local"
                    className="form-control"
                    name="createTime"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.doiTuongEntity.createTime)}
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="updateTimeLabel" for="updateTime">
                    <Translate contentKey="gatewayApp.commonDoiTuong.updateTime">Update Time</Translate>
                  </Label>
                  <AvInput
                    id="doi-tuong-updateTime"
                    type="datetime-local"
                    className="form-control"
                    name="updateTime"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.doiTuongEntity.updateTime)}
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="statusLabel">
                    <Translate contentKey="gatewayApp.commonDoiTuong.status">Status</Translate>
                  </Label>
                  <AvInput
                    id="doi-tuong-status"
                    type="select"
                    className="form-control"
                    name="status"
                    value={(!isNew && doiTuongEntity.status) || 'PUBLISH'}
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
                    <Translate contentKey="gatewayApp.commonDoiTuong.program">Program</Translate>
                  </Label>
                  <AvField
                    id="doi-tuong-program"
                    type="text"
                    name="program"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label for="nhomphanloai.id">
                    <Translate contentKey="gatewayApp.commonDoiTuong.nhomphanloai">Nhomphanloai</Translate>
                  </Label>
                  <AvInput id="doi-tuong-nhomphanloai" type="select" className="form-control" name="nhomphanloaiId">
                    <option value="" key="0" />
                    {nhomPhanLoais
                      ? nhomPhanLoais.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/doi-tuong" replace color="info">
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
  nhomPhanLoais: storeState.nhomPhanLoai.entities,
  doiTuongEntity: storeState.doiTuong.entity,
  loading: storeState.doiTuong.loading,
  updating: storeState.doiTuong.updating,
  updateSuccess: storeState.doiTuong.updateSuccess
});

const mapDispatchToProps = {
  getNhomPhanLoais,
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
)(DoiTuongUpdate);
