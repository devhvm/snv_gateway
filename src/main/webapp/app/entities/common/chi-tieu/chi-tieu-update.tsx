import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { INhomChiTieu } from 'app/shared/model/common/nhom-chi-tieu.model';
import { getEntities as getNhomChiTieus } from 'app/entities/common/nhom-chi-tieu/nhom-chi-tieu.reducer';
import { getEntity, updateEntity, createEntity, reset } from './chi-tieu.reducer';
import { IChiTieu } from 'app/shared/model/common/chi-tieu.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IChiTieuUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IChiTieuUpdateState {
  isNew: boolean;
  nhomchitieuId: string;
}

export class ChiTieuUpdate extends React.Component<IChiTieuUpdateProps, IChiTieuUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      nhomchitieuId: '0',
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

    this.props.getNhomChiTieus();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { chiTieuEntity } = this.props;
      const entity = {
        ...chiTieuEntity,
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
    this.props.history.push('/entity/chi-tieu');
  };

  render() {
    const { chiTieuEntity, nhomChiTieus, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="gatewayApp.commonChiTieu.home.createOrEditLabel">
              <Translate contentKey="gatewayApp.commonChiTieu.home.createOrEditLabel">Create or edit a ChiTieu</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : chiTieuEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="chi-tieu-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="chiTieuCodeLabel" for="chiTieuCode">
                    <Translate contentKey="gatewayApp.commonChiTieu.chiTieuCode">Chi Tieu Code</Translate>
                  </Label>
                  <AvField
                    id="chi-tieu-chiTieuCode"
                    type="text"
                    name="chiTieuCode"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="nameLabel" for="name">
                    <Translate contentKey="gatewayApp.commonChiTieu.name">Name</Translate>
                  </Label>
                  <AvField
                    id="chi-tieu-name"
                    type="text"
                    name="name"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="statusLabel">
                    <Translate contentKey="gatewayApp.commonChiTieu.status">Status</Translate>
                  </Label>
                  <AvInput
                    id="chi-tieu-status"
                    type="select"
                    className="form-control"
                    name="status"
                    value={(!isNew && chiTieuEntity.status) || 'PUBLISH'}
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
                  <Label for="nhomchitieu.nhomChiTieuCode">
                    <Translate contentKey="gatewayApp.commonChiTieu.nhomchitieu">Nhomchitieu</Translate>
                  </Label>
                  <AvInput id="chi-tieu-nhomchitieu" type="select" className="form-control" name="nhomchitieuId">
                    <option value="" key="0" />
                    {nhomChiTieus
                      ? nhomChiTieus.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.nhomChiTieuCode}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/chi-tieu" replace color="info">
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
  nhomChiTieus: storeState.nhomChiTieu.entities,
  chiTieuEntity: storeState.chiTieu.entity,
  loading: storeState.chiTieu.loading,
  updating: storeState.chiTieu.updating,
  updateSuccess: storeState.chiTieu.updateSuccess
});

const mapDispatchToProps = {
  getNhomChiTieus,
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
)(ChiTieuUpdate);
