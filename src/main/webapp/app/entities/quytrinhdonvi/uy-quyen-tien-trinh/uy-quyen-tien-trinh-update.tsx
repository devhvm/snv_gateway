import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IQuyTrinhDonVi } from 'app/shared/model/quytrinhdonvi/quy-trinh-don-vi.model';
import { getEntities as getQuyTrinhDonVis } from 'app/entities/quytrinhdonvi/quy-trinh-don-vi/quy-trinh-don-vi.reducer';
import { getEntity, updateEntity, createEntity, reset } from './uy-quyen-tien-trinh.reducer';
import { IUyQuyenTienTrinh } from 'app/shared/model/quytrinhdonvi/uy-quyen-tien-trinh.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IUyQuyenTienTrinhUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IUyQuyenTienTrinhUpdateState {
  isNew: boolean;
  quyTrinhDonViId: string;
}

export class UyQuyenTienTrinhUpdate extends React.Component<IUyQuyenTienTrinhUpdateProps, IUyQuyenTienTrinhUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      quyTrinhDonViId: '0',
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

    this.props.getQuyTrinhDonVis();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { uyQuyenTienTrinhEntity } = this.props;
      const entity = {
        ...uyQuyenTienTrinhEntity,
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
    this.props.history.push('/entity/uy-quyen-tien-trinh');
  };

  render() {
    const { uyQuyenTienTrinhEntity, quyTrinhDonVis, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="gatewayApp.quytrinhdonviUyQuyenTienTrinh.home.createOrEditLabel">
              <Translate contentKey="gatewayApp.quytrinhdonviUyQuyenTienTrinh.home.createOrEditLabel">
                Create or edit a UyQuyenTienTrinh
              </Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : uyQuyenTienTrinhEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="uy-quyen-tien-trinh-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="tienTrinhCodeLabel" for="tienTrinhCode">
                    <Translate contentKey="gatewayApp.quytrinhdonviUyQuyenTienTrinh.tienTrinhCode">Tien Trinh Code</Translate>
                  </Label>
                  <AvField
                    id="uy-quyen-tien-trinh-tienTrinhCode"
                    type="text"
                    name="tienTrinhCode"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="fromUserIdLabel" for="fromUserId">
                    <Translate contentKey="gatewayApp.quytrinhdonviUyQuyenTienTrinh.fromUserId">From User Id</Translate>
                  </Label>
                  <AvField
                    id="uy-quyen-tien-trinh-fromUserId"
                    type="text"
                    name="fromUserId"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="toUserIdLabel" for="toUserId">
                    <Translate contentKey="gatewayApp.quytrinhdonviUyQuyenTienTrinh.toUserId">To User Id</Translate>
                  </Label>
                  <AvField
                    id="uy-quyen-tien-trinh-toUserId"
                    type="text"
                    name="toUserId"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="roleLabel" for="role">
                    <Translate contentKey="gatewayApp.quytrinhdonviUyQuyenTienTrinh.role">Role</Translate>
                  </Label>
                  <AvField
                    id="uy-quyen-tien-trinh-role"
                    type="text"
                    name="role"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label for="quyTrinhDonVi.name">
                    <Translate contentKey="gatewayApp.quytrinhdonviUyQuyenTienTrinh.quyTrinhDonVi">Quy Trinh Don Vi</Translate>
                  </Label>
                  <AvInput id="uy-quyen-tien-trinh-quyTrinhDonVi" type="select" className="form-control" name="quyTrinhDonViId">
                    <option value="" key="0" />
                    {quyTrinhDonVis
                      ? quyTrinhDonVis.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.name}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/uy-quyen-tien-trinh" replace color="info">
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
  quyTrinhDonVis: storeState.quyTrinhDonVi.entities,
  uyQuyenTienTrinhEntity: storeState.uyQuyenTienTrinh.entity,
  loading: storeState.uyQuyenTienTrinh.loading,
  updating: storeState.uyQuyenTienTrinh.updating,
  updateSuccess: storeState.uyQuyenTienTrinh.updateSuccess
});

const mapDispatchToProps = {
  getQuyTrinhDonVis,
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
)(UyQuyenTienTrinhUpdate);
