import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ICoQuanHanhChinh } from 'app/shared/model/quytrinhdonvi/co-quan-hanh-chinh.model';
import { getEntities as getCoQuanHanhChinhs } from 'app/entities/quytrinhdonvi/co-quan-hanh-chinh/co-quan-hanh-chinh.reducer';
import { getEntity, updateEntity, createEntity, reset } from './quy-trinh-don-vi.reducer';
import { IQuyTrinhDonVi } from 'app/shared/model/quytrinhdonvi/quy-trinh-don-vi.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IQuyTrinhDonViUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IQuyTrinhDonViUpdateState {
  isNew: boolean;
  coQuanHanhChinhId: string;
}

export class QuyTrinhDonViUpdate extends React.Component<IQuyTrinhDonViUpdateProps, IQuyTrinhDonViUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      coQuanHanhChinhId: '0',
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

    this.props.getCoQuanHanhChinhs();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { quyTrinhDonViEntity } = this.props;
      const entity = {
        ...quyTrinhDonViEntity,
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
    this.props.history.push('/entity/quy-trinh-don-vi');
  };

  render() {
    const { quyTrinhDonViEntity, coQuanHanhChinhs, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="gatewayApp.quytrinhdonviQuyTrinhDonVi.home.createOrEditLabel">
              <Translate contentKey="gatewayApp.quytrinhdonviQuyTrinhDonVi.home.createOrEditLabel">
                Create or edit a QuyTrinhDonVi
              </Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : quyTrinhDonViEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="quy-trinh-don-vi-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="quyTrinhCodeLabel" for="quyTrinhCode">
                    <Translate contentKey="gatewayApp.quytrinhdonviQuyTrinhDonVi.quyTrinhCode">Quy Trinh Code</Translate>
                  </Label>
                  <AvField
                    id="quy-trinh-don-vi-quyTrinhCode"
                    type="text"
                    name="quyTrinhCode"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="nameLabel" for="name">
                    <Translate contentKey="gatewayApp.quytrinhdonviQuyTrinhDonVi.name">Name</Translate>
                  </Label>
                  <AvField
                    id="quy-trinh-don-vi-name"
                    type="text"
                    name="name"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label for="coQuanHanhChinh.name">
                    <Translate contentKey="gatewayApp.quytrinhdonviQuyTrinhDonVi.coQuanHanhChinh">Co Quan Hanh Chinh</Translate>
                  </Label>
                  <AvInput id="quy-trinh-don-vi-coQuanHanhChinh" type="select" className="form-control" name="coQuanHanhChinhId">
                    <option value="" key="0" />
                    {coQuanHanhChinhs
                      ? coQuanHanhChinhs.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.name}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/quy-trinh-don-vi" replace color="info">
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
  coQuanHanhChinhs: storeState.coQuanHanhChinh.entities,
  quyTrinhDonViEntity: storeState.quyTrinhDonVi.entity,
  loading: storeState.quyTrinhDonVi.loading,
  updating: storeState.quyTrinhDonVi.updating,
  updateSuccess: storeState.quyTrinhDonVi.updateSuccess
});

const mapDispatchToProps = {
  getCoQuanHanhChinhs,
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
)(QuyTrinhDonViUpdate);
