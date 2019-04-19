import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './co-quan-hanh-chinh.reducer';
import { ICoQuanHanhChinh } from 'app/shared/model/quytrinhdonvi/co-quan-hanh-chinh.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ICoQuanHanhChinhUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface ICoQuanHanhChinhUpdateState {
  isNew: boolean;
}

export class CoQuanHanhChinhUpdate extends React.Component<ICoQuanHanhChinhUpdateProps, ICoQuanHanhChinhUpdateState> {
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
      const { coQuanHanhChinhEntity } = this.props;
      const entity = {
        ...coQuanHanhChinhEntity,
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
    this.props.history.push('/entity/co-quan-hanh-chinh');
  };

  render() {
    const { coQuanHanhChinhEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="gatewayApp.quytrinhdonviCoQuanHanhChinh.home.createOrEditLabel">
              <Translate contentKey="gatewayApp.quytrinhdonviCoQuanHanhChinh.home.createOrEditLabel">
                Create or edit a CoQuanHanhChinh
              </Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : coQuanHanhChinhEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="co-quan-hanh-chinh-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="coQuanHanhChinhCodeLabel" for="coQuanHanhChinhCode">
                    <Translate contentKey="gatewayApp.quytrinhdonviCoQuanHanhChinh.coQuanHanhChinhCode">Co Quan Hanh Chinh Code</Translate>
                  </Label>
                  <AvField
                    id="co-quan-hanh-chinh-coQuanHanhChinhCode"
                    type="text"
                    name="coQuanHanhChinhCode"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="nameLabel" for="name">
                    <Translate contentKey="gatewayApp.quytrinhdonviCoQuanHanhChinh.name">Name</Translate>
                  </Label>
                  <AvField
                    id="co-quan-hanh-chinh-name"
                    type="text"
                    name="name"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="descriptionLabel" for="description">
                    <Translate contentKey="gatewayApp.quytrinhdonviCoQuanHanhChinh.description">Description</Translate>
                  </Label>
                  <AvField
                    id="co-quan-hanh-chinh-description"
                    type="text"
                    name="description"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="maDinhDanhCodeLabel" for="maDinhDanhCode">
                    <Translate contentKey="gatewayApp.quytrinhdonviCoQuanHanhChinh.maDinhDanhCode">Ma Dinh Danh Code</Translate>
                  </Label>
                  <AvField
                    id="co-quan-hanh-chinh-maDinhDanhCode"
                    type="text"
                    name="maDinhDanhCode"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="levelLabel" for="level">
                    <Translate contentKey="gatewayApp.quytrinhdonviCoQuanHanhChinh.level">Level</Translate>
                  </Label>
                  <AvField
                    id="co-quan-hanh-chinh-level"
                    type="text"
                    name="level"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="statusLabel" for="status">
                    <Translate contentKey="gatewayApp.quytrinhdonviCoQuanHanhChinh.status">Status</Translate>
                  </Label>
                  <AvField
                    id="co-quan-hanh-chinh-status"
                    type="text"
                    name="status"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/co-quan-hanh-chinh" replace color="info">
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
  coQuanHanhChinhEntity: storeState.coQuanHanhChinh.entity,
  loading: storeState.coQuanHanhChinh.loading,
  updating: storeState.coQuanHanhChinh.updating,
  updateSuccess: storeState.coQuanHanhChinh.updateSuccess
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
)(CoQuanHanhChinhUpdate);
