import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ITienTrinh } from 'app/shared/model/quanlyquytrinh/tien-trinh.model';
import { getEntities as getTienTrinhs } from 'app/entities/quanlyquytrinh/tien-trinh/tien-trinh.reducer';
import { getEntity, updateEntity, createEntity, reset } from './tien-trinh-xu-ly.reducer';
import { ITienTrinhXuLy } from 'app/shared/model/quanlyquytrinh/tien-trinh-xu-ly.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ITienTrinhXuLyUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface ITienTrinhXuLyUpdateState {
  isNew: boolean;
  tienTrinhId: string;
}

export class TienTrinhXuLyUpdate extends React.Component<ITienTrinhXuLyUpdateProps, ITienTrinhXuLyUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      tienTrinhId: '0',
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

    this.props.getTienTrinhs();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { tienTrinhXuLyEntity } = this.props;
      const entity = {
        ...tienTrinhXuLyEntity,
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
    this.props.history.push('/entity/tien-trinh-xu-ly');
  };

  render() {
    const { tienTrinhXuLyEntity, tienTrinhs, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="gatewayApp.quanlyquytrinhTienTrinhXuLy.home.createOrEditLabel">
              <Translate contentKey="gatewayApp.quanlyquytrinhTienTrinhXuLy.home.createOrEditLabel">
                Create or edit a TienTrinhXuLy
              </Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : tienTrinhXuLyEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="tien-trinh-xu-ly-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="batdauCodeLabel" for="batdauCode">
                    <Translate contentKey="gatewayApp.quanlyquytrinhTienTrinhXuLy.batdauCode">Batdau Code</Translate>
                  </Label>
                  <AvField
                    id="tien-trinh-xu-ly-batdauCode"
                    type="text"
                    name="batdauCode"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="ketThucCodeLabel" for="ketThucCode">
                    <Translate contentKey="gatewayApp.quanlyquytrinhTienTrinhXuLy.ketThucCode">Ket Thuc Code</Translate>
                  </Label>
                  <AvField
                    id="tien-trinh-xu-ly-ketThucCode"
                    type="text"
                    name="ketThucCode"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label for="tienTrinh.name">
                    <Translate contentKey="gatewayApp.quanlyquytrinhTienTrinhXuLy.tienTrinh">Tien Trinh</Translate>
                  </Label>
                  <AvInput id="tien-trinh-xu-ly-tienTrinh" type="select" className="form-control" name="tienTrinhId">
                    <option value="" key="0" />
                    {tienTrinhs
                      ? tienTrinhs.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.name}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/tien-trinh-xu-ly" replace color="info">
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
  tienTrinhs: storeState.tienTrinh.entities,
  tienTrinhXuLyEntity: storeState.tienTrinhXuLy.entity,
  loading: storeState.tienTrinhXuLy.loading,
  updating: storeState.tienTrinhXuLy.updating,
  updateSuccess: storeState.tienTrinhXuLy.updateSuccess
});

const mapDispatchToProps = {
  getTienTrinhs,
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
)(TienTrinhXuLyUpdate);
