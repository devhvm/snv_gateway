import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Translate, ICrudGetAction, ICrudDeleteAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IUyQuyenTienTrinh } from 'app/shared/model/quytrinhdonvi/uy-quyen-tien-trinh.model';
import { IRootState } from 'app/shared/reducers';
import { getEntity, deleteEntity } from './uy-quyen-tien-trinh.reducer';

export interface IUyQuyenTienTrinhDeleteDialogProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class UyQuyenTienTrinhDeleteDialog extends React.Component<IUyQuyenTienTrinhDeleteDialogProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  confirmDelete = event => {
    this.props.deleteEntity(this.props.uyQuyenTienTrinhEntity.id);
    this.handleClose(event);
  };

  handleClose = event => {
    event.stopPropagation();
    this.props.history.goBack();
  };

  render() {
    const { uyQuyenTienTrinhEntity } = this.props;
    return (
      <Modal isOpen toggle={this.handleClose}>
        <ModalHeader toggle={this.handleClose}>
          <Translate contentKey="entity.delete.title">Confirm delete operation</Translate>
        </ModalHeader>
        <ModalBody id="gatewayApp.quytrinhdonviUyQuyenTienTrinh.delete.question">
          <Translate contentKey="gatewayApp.quytrinhdonviUyQuyenTienTrinh.delete.question" interpolate={{ id: uyQuyenTienTrinhEntity.id }}>
            Are you sure you want to delete this UyQuyenTienTrinh?
          </Translate>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={this.handleClose}>
            <FontAwesomeIcon icon="ban" />
            &nbsp;
            <Translate contentKey="entity.action.cancel">Cancel</Translate>
          </Button>
          <Button id="jhi-confirm-delete-uyQuyenTienTrinh" color="danger" onClick={this.confirmDelete}>
            <FontAwesomeIcon icon="trash" />
            &nbsp;
            <Translate contentKey="entity.action.delete">Delete</Translate>
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = ({ uyQuyenTienTrinh }: IRootState) => ({
  uyQuyenTienTrinhEntity: uyQuyenTienTrinh.entity
});

const mapDispatchToProps = { getEntity, deleteEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UyQuyenTienTrinhDeleteDialog);
