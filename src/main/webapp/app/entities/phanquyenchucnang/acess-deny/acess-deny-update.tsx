import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IMenuItem } from 'app/shared/model/phanquyenchucnang/menu-item.model';
import { getEntities as getMenuItems } from 'app/entities/phanquyenchucnang/menu-item/menu-item.reducer';
import { getEntity, updateEntity, createEntity, reset } from './acess-deny.reducer';
import { IAcessDeny } from 'app/shared/model/phanquyenchucnang/acess-deny.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IAcessDenyUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IAcessDenyUpdateState {
  isNew: boolean;
  menuItemId: string;
}

export class AcessDenyUpdate extends React.Component<IAcessDenyUpdateProps, IAcessDenyUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      menuItemId: '0',
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

    this.props.getMenuItems();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { acessDenyEntity } = this.props;
      const entity = {
        ...acessDenyEntity,
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
    this.props.history.push('/entity/acess-deny');
  };

  render() {
    const { acessDenyEntity, menuItems, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="gatewayApp.phanquyenchucnangAcessDeny.home.createOrEditLabel">
              <Translate contentKey="gatewayApp.phanquyenchucnangAcessDeny.home.createOrEditLabel">Create or edit a AcessDeny</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : acessDenyEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="acess-deny-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="userIdLabel" for="userId">
                    <Translate contentKey="gatewayApp.phanquyenchucnangAcessDeny.userId">User Id</Translate>
                  </Label>
                  <AvField
                    id="acess-deny-userId"
                    type="text"
                    name="userId"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label for="menuItem.menuItemCode">
                    <Translate contentKey="gatewayApp.phanquyenchucnangAcessDeny.menuItem">Menu Item</Translate>
                  </Label>
                  <AvInput id="acess-deny-menuItem" type="select" className="form-control" name="menuItemId">
                    <option value="" key="0" />
                    {menuItems
                      ? menuItems.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.menuItemCode}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/acess-deny" replace color="info">
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
  menuItems: storeState.menuItem.entities,
  acessDenyEntity: storeState.acessDeny.entity,
  loading: storeState.acessDeny.loading,
  updating: storeState.acessDeny.updating,
  updateSuccess: storeState.acessDeny.updateSuccess
});

const mapDispatchToProps = {
  getMenuItems,
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
)(AcessDenyUpdate);
