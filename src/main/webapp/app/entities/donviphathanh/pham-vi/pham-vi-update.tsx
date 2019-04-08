import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IMauPhatHanh } from 'app/shared/model/donviphathanh/mau-phat-hanh.model';
import { getEntities as getMauPhatHanhs } from 'app/entities/donviphathanh/mau-phat-hanh/mau-phat-hanh.reducer';
import { getEntity, updateEntity, createEntity, reset } from './pham-vi.reducer';
import { IPhamVi } from 'app/shared/model/donviphathanh/pham-vi.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPhamViUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IPhamViUpdateState {
  isNew: boolean;
  mauphathanhId: string;
}

export class PhamViUpdate extends React.Component<IPhamViUpdateProps, IPhamViUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      mauphathanhId: '0',
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

    this.props.getMauPhatHanhs();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { phamViEntity } = this.props;
      const entity = {
        ...phamViEntity,
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
    this.props.history.push('/entity/pham-vi');
  };

  render() {
    const { phamViEntity, mauPhatHanhs, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="gatewayApp.donviphathanhPhamVi.home.createOrEditLabel">
              <Translate contentKey="gatewayApp.donviphathanhPhamVi.home.createOrEditLabel">Create or edit a PhamVi</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : phamViEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="pham-vi-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="beginLabel" for="begin">
                    <Translate contentKey="gatewayApp.donviphathanhPhamVi.begin">Begin</Translate>
                  </Label>
                  <AvField
                    id="pham-vi-begin"
                    type="text"
                    name="begin"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="endLabel" for="end">
                    <Translate contentKey="gatewayApp.donviphathanhPhamVi.end">End</Translate>
                  </Label>
                  <AvField
                    id="pham-vi-end"
                    type="text"
                    name="end"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/pham-vi" replace color="info">
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
  mauPhatHanhs: storeState.mauPhatHanh.entities,
  phamViEntity: storeState.phamVi.entity,
  loading: storeState.phamVi.loading,
  updating: storeState.phamVi.updating,
  updateSuccess: storeState.phamVi.updateSuccess
});

const mapDispatchToProps = {
  getMauPhatHanhs,
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
)(PhamViUpdate);
