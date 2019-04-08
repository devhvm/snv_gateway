import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ITieuChi } from 'app/shared/model/donviphathanh/tieu-chi.model';
import { getEntities as getTieuChis } from 'app/entities/donviphathanh/tieu-chi/tieu-chi.reducer';
import { IMauPhatHanh } from 'app/shared/model/donviphathanh/mau-phat-hanh.model';
import { getEntities as getMauPhatHanhs } from 'app/entities/donviphathanh/mau-phat-hanh/mau-phat-hanh.reducer';
import { getEntity, updateEntity, createEntity, reset } from './mau-phat-hanh-tieu-chi.reducer';
import { IMauPhatHanhTieuChi } from 'app/shared/model/donviphathanh/mau-phat-hanh-tieu-chi.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IMauPhatHanhTieuChiUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IMauPhatHanhTieuChiUpdateState {
  isNew: boolean;
  tieuchiId: string;
  mauphathanhId: string;
}

export class MauPhatHanhTieuChiUpdate extends React.Component<IMauPhatHanhTieuChiUpdateProps, IMauPhatHanhTieuChiUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      tieuchiId: '0',
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

    this.props.getTieuChis();
    this.props.getMauPhatHanhs();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { mauPhatHanhTieuChiEntity } = this.props;
      const entity = {
        ...mauPhatHanhTieuChiEntity,
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
    this.props.history.push('/entity/mau-phat-hanh-tieu-chi');
  };

  render() {
    const { mauPhatHanhTieuChiEntity, tieuChis, mauPhatHanhs, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="gatewayApp.donviphathanhMauPhatHanhTieuChi.home.createOrEditLabel">
              <Translate contentKey="gatewayApp.donviphathanhMauPhatHanhTieuChi.home.createOrEditLabel">
                Create or edit a MauPhatHanhTieuChi
              </Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : mauPhatHanhTieuChiEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="mau-phat-hanh-tieu-chi-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label for="tieuchi.id">
                    <Translate contentKey="gatewayApp.donviphathanhMauPhatHanhTieuChi.tieuchi">Tieuchi</Translate>
                  </Label>
                  <AvInput id="mau-phat-hanh-tieu-chi-tieuchi" type="select" className="form-control" name="tieuchiId">
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
                <AvGroup>
                  <Label for="mauphathanh.mauPhatHanhCode">
                    <Translate contentKey="gatewayApp.donviphathanhMauPhatHanhTieuChi.mauphathanh">Mauphathanh</Translate>
                  </Label>
                  <AvInput id="mau-phat-hanh-tieu-chi-mauphathanh" type="select" className="form-control" name="mauphathanhId">
                    <option value="" key="0" />
                    {mauPhatHanhs
                      ? mauPhatHanhs.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.mauPhatHanhCode}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/mau-phat-hanh-tieu-chi" replace color="info">
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
  mauPhatHanhs: storeState.mauPhatHanh.entities,
  mauPhatHanhTieuChiEntity: storeState.mauPhatHanhTieuChi.entity,
  loading: storeState.mauPhatHanhTieuChi.loading,
  updating: storeState.mauPhatHanhTieuChi.updating,
  updateSuccess: storeState.mauPhatHanhTieuChi.updateSuccess
});

const mapDispatchToProps = {
  getTieuChis,
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
)(MauPhatHanhTieuChiUpdate);
