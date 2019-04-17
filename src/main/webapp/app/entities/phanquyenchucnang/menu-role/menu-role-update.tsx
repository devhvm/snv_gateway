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
import { getEntity, updateEntity, createEntity, reset } from './menu-role.reducer';
import { IMenuRole } from 'app/shared/model/phanquyenchucnang/menu-role.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IMenuRoleUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IMenuRoleUpdateState {
  isNew: boolean;
  menuItemId: string;
}

export class MenuRoleUpdate extends React.Component<IMenuRoleUpdateProps, IMenuRoleUpdateState> {
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
      const { menuRoleEntity } = this.props;
      const entity = {
        ...menuRoleEntity,
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
    this.props.history.push('/entity/menu-role');
  };

  render() {
    const { menuRoleEntity, menuItems, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="gatewayApp.phanquyenchucnangMenuRole.home.createOrEditLabel">
              <Translate contentKey="gatewayApp.phanquyenchucnangMenuRole.home.createOrEditLabel">Create or edit a MenuRole</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : menuRoleEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="menu-role-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="menuItemRoleCodeLabel" for="menuItemRoleCode">
                    <Translate contentKey="gatewayApp.phanquyenchucnangMenuRole.menuItemRoleCode">Menu Item Role Code</Translate>
                  </Label>
                  <AvField
                    id="menu-role-menuItemRoleCode"
                    type="text"
                    name="menuItemRoleCode"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="roleLabel" for="role">
                    <Translate contentKey="gatewayApp.phanquyenchucnangMenuRole.role">Role</Translate>
                  </Label>
                  <AvField
                    id="menu-role-role"
                    type="text"
                    name="role"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="nameLabel" for="name">
                    <Translate contentKey="gatewayApp.phanquyenchucnangMenuRole.name">Name</Translate>
                  </Label>
                  <AvField
                    id="menu-role-name"
                    type="text"
                    name="name"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label for="menuItem.menuItemCode">
                    <Translate contentKey="gatewayApp.phanquyenchucnangMenuRole.menuItem">Menu Item</Translate>
                  </Label>
                  <AvInput id="menu-role-menuItem" type="select" className="form-control" name="menuItemId">
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
                <Button tag={Link} id="cancel-save" to="/entity/menu-role" replace color="info">
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
  menuRoleEntity: storeState.menuRole.entity,
  loading: storeState.menuRole.loading,
  updating: storeState.menuRole.updating,
  updateSuccess: storeState.menuRole.updateSuccess
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
)(MenuRoleUpdate);
