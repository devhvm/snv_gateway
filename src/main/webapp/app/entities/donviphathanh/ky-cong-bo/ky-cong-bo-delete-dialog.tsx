import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Translate, ICrudGetAction, ICrudDeleteAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IKyCongBo } from 'app/shared/model/donviphathanh/ky-cong-bo.model';
import { IRootState } from 'app/shared/reducers';
import { getEntity, deleteEntity } from './ky-cong-bo.reducer';

export interface IKyCongBoDeleteDialogProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class KyCongBoDeleteDialog extends React.Component<IKyCongBoDeleteDialogProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  confirmDelete = event => {
    this.props.deleteEntity(this.props.kyCongBoEntity.id);
    this.handleClose(event);
  };

  handleClose = event => {
    event.stopPropagation();
    this.props.history.goBack();
  };

  render() {
    const { kyCongBoEntity } = this.props;
    return (
      <Modal isOpen toggle={this.handleClose}>
        <ModalHeader toggle={this.handleClose}>
          <Translate contentKey="entity.delete.title">Confirm delete operation</Translate>
        </ModalHeader>
        <ModalBody id="gatewayApp.donviphathanhKyCongBo.delete.question">
          <Translate contentKey="gatewayApp.donviphathanhKyCongBo.delete.question" interpolate={{ id: kyCongBoEntity.id }}>
            Are you sure you want to delete this KyCongBo?
          </Translate>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={this.handleClose}>
            <FontAwesomeIcon icon="ban" />
            &nbsp;
            <Translate contentKey="entity.action.cancel">Cancel</Translate>
          </Button>
          <Button id="jhi-confirm-delete-kyCongBo" color="danger" onClick={this.confirmDelete}>
            <FontAwesomeIcon icon="trash" />
            &nbsp;
            <Translate contentKey="entity.action.delete">Delete</Translate>
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = ({ kyCongBo }: IRootState) => ({
  kyCongBoEntity: kyCongBo.entity
});

const mapDispatchToProps = { getEntity, deleteEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(KyCongBoDeleteDialog);
