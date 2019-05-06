import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Translate, ICrudGetAction, ICrudDeleteAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { ILoaiQuyTrinh } from 'app/shared/model/quanlyquytrinh/loai-quy-trinh.model';
import { IRootState } from 'app/shared/reducers';
import { getEntity, deleteEntity } from './loai-quy-trinh.reducer';

export interface ILoaiQuyTrinhDeleteDialogProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class LoaiQuyTrinhDeleteDialog extends React.Component<ILoaiQuyTrinhDeleteDialogProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  confirmDelete = event => {
    this.props.deleteEntity(this.props.loaiQuyTrinhEntity.id);
    this.handleClose(event);
  };

  handleClose = event => {
    event.stopPropagation();
    this.props.history.goBack();
  };

  render() {
    const { loaiQuyTrinhEntity } = this.props;
    return (
      <Modal isOpen toggle={this.handleClose}>
        <ModalHeader toggle={this.handleClose}>
          <Translate contentKey="entity.delete.title">Confirm delete operation</Translate>
        </ModalHeader>
        <ModalBody id="gatewayApp.quanlyquytrinhLoaiQuyTrinh.delete.question">
          <Translate contentKey="gatewayApp.quanlyquytrinhLoaiQuyTrinh.delete.question" interpolate={{ id: loaiQuyTrinhEntity.id }}>
            Are you sure you want to delete this LoaiQuyTrinh?
          </Translate>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={this.handleClose}>
            <FontAwesomeIcon icon="ban" />
            &nbsp;
            <Translate contentKey="entity.action.cancel">Cancel</Translate>
          </Button>
          <Button id="jhi-confirm-delete-loaiQuyTrinh" color="danger" onClick={this.confirmDelete}>
            <FontAwesomeIcon icon="trash" />
            &nbsp;
            <Translate contentKey="entity.action.delete">Delete</Translate>
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = ({ loaiQuyTrinh }: IRootState) => ({
  loaiQuyTrinhEntity: loaiQuyTrinh.entity
});

const mapDispatchToProps = { getEntity, deleteEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoaiQuyTrinhDeleteDialog);
