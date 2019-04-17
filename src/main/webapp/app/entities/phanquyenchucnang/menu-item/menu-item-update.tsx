import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IScreen } from 'app/shared/model/phanquyenchucnang/screen.model';
import { getEntities as getScreens } from 'app/entities/phanquyenchucnang/screen/screen.reducer';
import { IMenu } from 'app/shared/model/phanquyenchucnang/menu.model';
import { getEntities as getMenus } from 'app/entities/phanquyenchucnang/menu/menu.reducer';
import { getEntity, updateEntity, createEntity, reset } from './menu-item.reducer';
import { IMenuItem } from 'app/shared/model/phanquyenchucnang/menu-item.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IMenuItemUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IMenuItemUpdateState {
  isNew: boolean;
  screenId: string;
  menuId: string;
}

export class MenuItemUpdate extends React.Component<IMenuItemUpdateProps, IMenuItemUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      screenId: '0',
      menuId: '0',
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

    this.props.getScreens();
    this.props.getMenus();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { menuItemEntity } = this.props;
      const entity = {
        ...menuItemEntity,
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
    this.props.history.push('/entity/menu-item');
  };

  render() {
    const { menuItemEntity, screens, menus, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="gatewayApp.phanquyenchucnangMenuItem.home.createOrEditLabel">
              <Translate contentKey="gatewayApp.phanquyenchucnangMenuItem.home.createOrEditLabel">Create or edit a MenuItem</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : menuItemEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="menu-item-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="menuItemCodeLabel" for="menuItemCode">
                    <Translate contentKey="gatewayApp.phanquyenchucnangMenuItem.menuItemCode">Menu Item Code</Translate>
                  </Label>
                  <AvField
                    id="menu-item-menuItemCode"
                    type="text"
                    name="menuItemCode"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="nameLabel" for="name">
                    <Translate contentKey="gatewayApp.phanquyenchucnangMenuItem.name">Name</Translate>
                  </Label>
                  <AvField
                    id="menu-item-name"
                    type="text"
                    name="name"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="iconLabel" for="icon">
                    <Translate contentKey="gatewayApp.phanquyenchucnangMenuItem.icon">Icon</Translate>
                  </Label>
                  <AvField
                    id="menu-item-icon"
                    type="text"
                    name="icon"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label for="screen.screenCode">
                    <Translate contentKey="gatewayApp.phanquyenchucnangMenuItem.screen">Screen</Translate>
                  </Label>
                  <AvInput id="menu-item-screen" type="select" className="form-control" name="screenId">
                    <option value="" key="0" />
                    {screens
                      ? screens.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.screenCode}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="menu.menuCode">
                    <Translate contentKey="gatewayApp.phanquyenchucnangMenuItem.menu">Menu</Translate>
                  </Label>
                  <AvInput id="menu-item-menu" type="select" className="form-control" name="menuId">
                    <option value="" key="0" />
                    {menus
                      ? menus.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.menuCode}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/menu-item" replace color="info">
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
  screens: storeState.screen.entities,
  menus: storeState.menu.entities,
  menuItemEntity: storeState.menuItem.entity,
  loading: storeState.menuItem.loading,
  updating: storeState.menuItem.updating,
  updateSuccess: storeState.menuItem.updateSuccess
});

const mapDispatchToProps = {
  getScreens,
  getMenus,
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
)(MenuItemUpdate);
