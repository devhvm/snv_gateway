import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Translate, ICrudGetAction, ICrudDeleteAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IMauPhatHanh } from 'app/shared/model/donviphathanh/mau-phat-hanh.model';
import { IRootState } from 'app/shared/reducers';
import { getEntity, deleteEntity } from './mau-phat-hanh.reducer';

export interface IMauPhatHanhDeleteDialogProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class MauPhatHanhDeleteDialog extends React.Component<IMauPhatHanhDeleteDialogProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  confirmDelete = event => {
    this.props.deleteEntity(this.props.mauPhatHanhEntity.id);
    this.handleClose(event);
  };

  handleClose = event => {
    event.stopPropagation();
    this.props.history.goBack();
  };

  render() {
    const { mauPhatHanhEntity } = this.props;
    return (
      <Modal isOpen toggle={this.handleClose}>
        <ModalHeader toggle={this.handleClose}>
          <Translate contentKey="entity.delete.title">Confirm delete operation</Translate>
        </ModalHeader>
        <ModalBody id="gatewayApp.donviphathanhMauPhatHanh.delete.question">
          <Translate contentKey="gatewayApp.donviphathanhMauPhatHanh.delete.question" interpolate={{ id: mauPhatHanhEntity.id }}>
            Are you sure you want to delete this MauPhatHanh?
          </Translate>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={this.handleClose}>
            <FontAwesomeIcon icon="ban" />
            &nbsp;
            <Translate contentKey="entity.action.cancel">Cancel</Translate>
          </Button>
          <Button id="jhi-confirm-delete-mauPhatHanh" color="danger" onClick={this.confirmDelete}>
            <FontAwesomeIcon icon="trash" />
            &nbsp;
            <Translate contentKey="entity.action.delete">Delete</Translate>
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = ({ mauPhatHanh }: IRootState) => ({
  mauPhatHanhEntity: mauPhatHanh.entity
});

const mapDispatchToProps = { getEntity, deleteEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MauPhatHanhDeleteDialog);
