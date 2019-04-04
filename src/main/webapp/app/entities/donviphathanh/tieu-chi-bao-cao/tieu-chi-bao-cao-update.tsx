import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ITieuChi } from 'app/shared/model/donviphathanh/tieu-chi.model';
import { getEntities as getTieuChis } from 'app/entities/donviphathanh/tieu-chi/tieu-chi.reducer';
import { getEntity, updateEntity, createEntity, reset } from './tieu-chi-bao-cao.reducer';
import { ITieuChiBaoCao } from 'app/shared/model/donviphathanh/tieu-chi-bao-cao.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ITieuChiBaoCaoUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface ITieuChiBaoCaoUpdateState {
  isNew: boolean;
  tieuchiId: string;
}

export class TieuChiBaoCaoUpdate extends React.Component<ITieuChiBaoCaoUpdateProps, ITieuChiBaoCaoUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      tieuchiId: '0',
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

    this.props.getTieuChis();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { tieuChiBaoCaoEntity } = this.props;
      const entity = {
        ...tieuChiBaoCaoEntity,
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
    this.props.history.push('/entity/tieu-chi-bao-cao');
  };

  render() {
    const { tieuChiBaoCaoEntity, tieuChis, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="gatewayApp.donviphathanhTieuChiBaoCao.home.createOrEditLabel">
              <Translate contentKey="gatewayApp.donviphathanhTieuChiBaoCao.home.createOrEditLabel">
                Create or edit a TieuChiBaoCao
              </Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : tieuChiBaoCaoEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="tieu-chi-bao-cao-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="tieuChiBaoCaoCodeLabel" for="tieuChiBaoCaoCode">
                    <Translate contentKey="gatewayApp.donviphathanhTieuChiBaoCao.tieuChiBaoCaoCode">Tieu Chi Bao Cao Code</Translate>
                  </Label>
                  <AvField
                    id="tieu-chi-bao-cao-tieuChiBaoCaoCode"
                    type="text"
                    name="tieuChiBaoCaoCode"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="statusLabel">
                    <Translate contentKey="gatewayApp.donviphathanhTieuChiBaoCao.status">Status</Translate>
                  </Label>
                  <AvInput
                    id="tieu-chi-bao-cao-status"
                    type="select"
                    className="form-control"
                    name="status"
                    value={(!isNew && tieuChiBaoCaoEntity.status) || 'NEW'}
                  >
                    <option value="NEW">
                      <Translate contentKey="gatewayApp.ReportStatus.NEW" />
                    </option>
                    <option value="ACTIVED">
                      <Translate contentKey="gatewayApp.ReportStatus.ACTIVED" />
                    </option>
                    <option value="CANCELLED">
                      <Translate contentKey="gatewayApp.ReportStatus.CANCELLED" />
                    </option>
                    <option value="DELETED">
                      <Translate contentKey="gatewayApp.ReportStatus.DELETED" />
                    </option>
                    <option value="SIGNED">
                      <Translate contentKey="gatewayApp.ReportStatus.SIGNED" />
                    </option>
                    <option value="COMPLETED">
                      <Translate contentKey="gatewayApp.ReportStatus.COMPLETED" />
                    </option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="tieuchi.id">
                    <Translate contentKey="gatewayApp.donviphathanhTieuChiBaoCao.tieuchi">Tieuchi</Translate>
                  </Label>
                  <AvInput id="tieu-chi-bao-cao-tieuchi" type="select" className="form-control" name="tieuchiId">
                    <option value="" key="0" />
                    {tieuChis
                      ? tieuChis.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/tieu-chi-bao-cao" replace color="info">
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
  tieuChis: storeState.tieuChi.entities,
  tieuChiBaoCaoEntity: storeState.tieuChiBaoCao.entity,
  loading: storeState.tieuChiBaoCao.loading,
  updating: storeState.tieuChiBaoCao.updating,
  updateSuccess: storeState.tieuChiBaoCao.updateSuccess
});

const mapDispatchToProps = {
  getTieuChis,
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
)(TieuChiBaoCaoUpdate);
