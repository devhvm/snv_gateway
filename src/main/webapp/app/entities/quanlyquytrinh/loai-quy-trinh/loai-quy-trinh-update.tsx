import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './loai-quy-trinh.reducer';
import { ILoaiQuyTrinh } from 'app/shared/model/quanlyquytrinh/loai-quy-trinh.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ILoaiQuyTrinhUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface ILoaiQuyTrinhUpdateState {
  isNew: boolean;
}

export class LoaiQuyTrinhUpdate extends React.Component<ILoaiQuyTrinhUpdateProps, ILoaiQuyTrinhUpdateState> {
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
      const { loaiQuyTrinhEntity } = this.props;
      const entity = {
        ...loaiQuyTrinhEntity,
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
    this.props.history.push('/entity/loai-quy-trinh');
  };

  render() {
    const { loaiQuyTrinhEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="gatewayApp.quanlyquytrinhLoaiQuyTrinh.home.createOrEditLabel">
              <Translate contentKey="gatewayApp.quanlyquytrinhLoaiQuyTrinh.home.createOrEditLabel">Create or edit a LoaiQuyTrinh</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : loaiQuyTrinhEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="loai-quy-trinh-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="loaiQuyTrinhCodeLabel" for="loaiQuyTrinhCode">
                    <Translate contentKey="gatewayApp.quanlyquytrinhLoaiQuyTrinh.loaiQuyTrinhCode">Loai Quy Trinh Code</Translate>
                  </Label>
                  <AvField
                    id="loai-quy-trinh-loaiQuyTrinhCode"
                    type="text"
                    name="loaiQuyTrinhCode"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="methodNameLabel" for="methodName">
                    <Translate contentKey="gatewayApp.quanlyquytrinhLoaiQuyTrinh.methodName">Method Name</Translate>
                  </Label>
                  <AvField id="loai-quy-trinh-methodName" type="text" name="methodName" />
                </AvGroup>
                <AvGroup>
                  <Label id="entityNameLabel" for="entityName">
                    <Translate contentKey="gatewayApp.quanlyquytrinhLoaiQuyTrinh.entityName">Entity Name</Translate>
                  </Label>
                  <AvField id="loai-quy-trinh-entityName" type="text" name="entityName" />
                </AvGroup>
                <AvGroup>
                  <Label id="serviceNameLabel" for="serviceName">
                    <Translate contentKey="gatewayApp.quanlyquytrinhLoaiQuyTrinh.serviceName">Service Name</Translate>
                  </Label>
                  <AvField id="loai-quy-trinh-serviceName" type="text" name="serviceName" />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/loai-quy-trinh" replace color="info">
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
  loaiQuyTrinhEntity: storeState.loaiQuyTrinh.entity,
  loading: storeState.loaiQuyTrinh.loading,
  updating: storeState.loaiQuyTrinh.updating,
  updateSuccess: storeState.loaiQuyTrinh.updateSuccess
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
)(LoaiQuyTrinhUpdate);
