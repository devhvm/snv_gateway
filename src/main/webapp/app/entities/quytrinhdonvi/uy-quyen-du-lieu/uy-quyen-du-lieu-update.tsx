import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IDuLieuTienTrinh } from 'app/shared/model/quytrinhdonvi/du-lieu-tien-trinh.model';
import { getEntities as getDuLieuTienTrinhs } from 'app/entities/quytrinhdonvi/du-lieu-tien-trinh/du-lieu-tien-trinh.reducer';
import { getEntity, updateEntity, createEntity, reset } from './uy-quyen-du-lieu.reducer';
import { IUyQuyenDuLieu } from 'app/shared/model/quytrinhdonvi/uy-quyen-du-lieu.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IUyQuyenDuLieuUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IUyQuyenDuLieuUpdateState {
  isNew: boolean;
  duLieuTienTrinhId: string;
}

export class UyQuyenDuLieuUpdate extends React.Component<IUyQuyenDuLieuUpdateProps, IUyQuyenDuLieuUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      duLieuTienTrinhId: '0',
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

    this.props.getDuLieuTienTrinhs();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { uyQuyenDuLieuEntity } = this.props;
      const entity = {
        ...uyQuyenDuLieuEntity,
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
    this.props.history.push('/entity/uy-quyen-du-lieu');
  };

  render() {
    const { uyQuyenDuLieuEntity, duLieuTienTrinhs, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="gatewayApp.quytrinhdonviUyQuyenDuLieu.home.createOrEditLabel">
              <Translate contentKey="gatewayApp.quytrinhdonviUyQuyenDuLieu.home.createOrEditLabel">
                Create or edit a UyQuyenDuLieu
              </Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : uyQuyenDuLieuEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="uy-quyen-du-lieu-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="fromUserIdLabel" for="fromUserId">
                    <Translate contentKey="gatewayApp.quytrinhdonviUyQuyenDuLieu.fromUserId">From User Id</Translate>
                  </Label>
                  <AvField
                    id="uy-quyen-du-lieu-fromUserId"
                    type="text"
                    name="fromUserId"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="toUserIdLabel" for="toUserId">
                    <Translate contentKey="gatewayApp.quytrinhdonviUyQuyenDuLieu.toUserId">To User Id</Translate>
                  </Label>
                  <AvField
                    id="uy-quyen-du-lieu-toUserId"
                    type="text"
                    name="toUserId"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="roleLabel" for="role">
                    <Translate contentKey="gatewayApp.quytrinhdonviUyQuyenDuLieu.role">Role</Translate>
                  </Label>
                  <AvField
                    id="uy-quyen-du-lieu-role"
                    type="text"
                    name="role"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label for="duLieuTienTrinh.id">
                    <Translate contentKey="gatewayApp.quytrinhdonviUyQuyenDuLieu.duLieuTienTrinh">Du Lieu Tien Trinh</Translate>
                  </Label>
                  <AvInput id="uy-quyen-du-lieu-duLieuTienTrinh" type="select" className="form-control" name="duLieuTienTrinhId">
                    <option value="" key="0" />
                    {duLieuTienTrinhs
                      ? duLieuTienTrinhs.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/uy-quyen-du-lieu" replace color="info">
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
  duLieuTienTrinhs: storeState.duLieuTienTrinh.entities,
  uyQuyenDuLieuEntity: storeState.uyQuyenDuLieu.entity,
  loading: storeState.uyQuyenDuLieu.loading,
  updating: storeState.uyQuyenDuLieu.updating,
  updateSuccess: storeState.uyQuyenDuLieu.updateSuccess
});

const mapDispatchToProps = {
  getDuLieuTienTrinhs,
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
)(UyQuyenDuLieuUpdate);
