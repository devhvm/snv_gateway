import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IDonViTinh } from 'app/shared/model/common/don-vi-tinh.model';
import { getEntities as getDonViTinhs } from 'app/entities/common/don-vi-tinh/don-vi-tinh.reducer';
import { getEntity, updateEntity, createEntity, reset } from './nhom-phan-loai.reducer';
import { INhomPhanLoai } from 'app/shared/model/common/nhom-phan-loai.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface INhomPhanLoaiUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface INhomPhanLoaiUpdateState {
  isNew: boolean;
  donvitinhId: string;
}

export class NhomPhanLoaiUpdate extends React.Component<INhomPhanLoaiUpdateProps, INhomPhanLoaiUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      donvitinhId: '0',
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

    this.props.getDonViTinhs();
  }

  saveEntity = (event, errors, values) => {
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
    const { nhomPhanLoaiEntity, donViTinhs, loading, updating } = this.props;
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
                  <Label for="donvitinh.donViTinhCode">
                    <Translate contentKey="gatewayApp.commonNhomPhanLoai.donvitinh">Donvitinh</Translate>
                  </Label>
                  <AvInput id="nhom-phan-loai-donvitinh" type="select" className="form-control" name="donvitinhId">
                    <option value="" key="0" />
                    {donViTinhs
                      ? donViTinhs.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.donViTinhCode}
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
  donViTinhs: storeState.donViTinh.entities,
  nhomPhanLoaiEntity: storeState.nhomPhanLoai.entity,
  loading: storeState.nhomPhanLoai.loading,
  updating: storeState.nhomPhanLoai.updating,
  updateSuccess: storeState.nhomPhanLoai.updateSuccess
});

const mapDispatchToProps = {
  getDonViTinhs,
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
