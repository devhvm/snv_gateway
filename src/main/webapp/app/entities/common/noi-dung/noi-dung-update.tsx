import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { INhomNoiDung } from 'app/shared/model/common/nhom-noi-dung.model';
import { getEntities as getNhomNoiDungs } from 'app/entities/common/nhom-noi-dung/nhom-noi-dung.reducer';
import { getEntity, updateEntity, createEntity, reset } from './noi-dung.reducer';
import { INoiDung } from 'app/shared/model/common/noi-dung.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface INoiDungUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface INoiDungUpdateState {
  isNew: boolean;
  nhomnoidungId: string;
}

export class NoiDungUpdate extends React.Component<INoiDungUpdateProps, INoiDungUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      nhomnoidungId: '0',
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

    this.props.getNhomNoiDungs();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { noiDungEntity } = this.props;
      const entity = {
        ...noiDungEntity,
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
    this.props.history.push('/entity/noi-dung');
  };

  render() {
    const { noiDungEntity, nhomNoiDungs, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="gatewayApp.commonNoiDung.home.createOrEditLabel">
              <Translate contentKey="gatewayApp.commonNoiDung.home.createOrEditLabel">Create or edit a NoiDung</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : noiDungEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="noi-dung-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="noiDungCodeLabel" for="noiDungCode">
                    <Translate contentKey="gatewayApp.commonNoiDung.noiDungCode">Noi Dung Code</Translate>
                  </Label>
                  <AvField
                    id="noi-dung-noiDungCode"
                    type="text"
                    name="noiDungCode"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="statusLabel">
                    <Translate contentKey="gatewayApp.commonNoiDung.status">Status</Translate>
                  </Label>
                  <AvInput
                    id="noi-dung-status"
                    type="select"
                    className="form-control"
                    name="status"
                    value={(!isNew && noiDungEntity.status) || 'PUBLISH'}
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
                  <Label for="nhomnoidung.id">
                    <Translate contentKey="gatewayApp.commonNoiDung.nhomnoidung">Nhomnoidung</Translate>
                  </Label>
                  <AvInput id="noi-dung-nhomnoidung" type="select" className="form-control" name="nhomnoidungId">
                    <option value="" key="0" />
                    {nhomNoiDungs
                      ? nhomNoiDungs.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/noi-dung" replace color="info">
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
  nhomNoiDungs: storeState.nhomNoiDung.entities,
  noiDungEntity: storeState.noiDung.entity,
  loading: storeState.noiDung.loading,
  updating: storeState.noiDung.updating,
  updateSuccess: storeState.noiDung.updateSuccess
});

const mapDispatchToProps = {
  getNhomNoiDungs,
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
)(NoiDungUpdate);
