import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Translate, ICrudGetAction, ICrudDeleteAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { ICoQuanHanhChinh } from 'app/shared/model/quytrinhdonvi/co-quan-hanh-chinh.model';
import { IRootState } from 'app/shared/reducers';
import { getEntity, deleteEntity } from './co-quan-hanh-chinh.reducer';

export interface ICoQuanHanhChinhDeleteDialogProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class CoQuanHanhChinhDeleteDialog extends React.Component<ICoQuanHanhChinhDeleteDialogProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  confirmDelete = event => {
    this.props.deleteEntity(this.props.coQuanHanhChinhEntity.id);
    this.handleClose(event);
  };

  handleClose = event => {
    event.stopPropagation();
    this.props.history.goBack();
  };

  render() {
    const { coQuanHanhChinhEntity } = this.props;
    return (
      <Modal isOpen toggle={this.handleClose}>
        <ModalHeader toggle={this.handleClose}>
          <Translate contentKey="entity.delete.title">Confirm delete operation</Translate>
        </ModalHeader>
        <ModalBody id="gatewayApp.quytrinhdonviCoQuanHanhChinh.delete.question">
          <Translate contentKey="gatewayApp.quytrinhdonviCoQuanHanhChinh.delete.question" interpolate={{ id: coQuanHanhChinhEntity.id }}>
            Are you sure you want to delete this CoQuanHanhChinh?
          </Translate>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={this.handleClose}>
            <FontAwesomeIcon icon="ban" />
            &nbsp;
            <Translate contentKey="entity.action.cancel">Cancel</Translate>
          </Button>
          <Button id="jhi-confirm-delete-coQuanHanhChinh" color="danger" onClick={this.confirmDelete}>
            <FontAwesomeIcon icon="trash" />
            &nbsp;
            <Translate contentKey="entity.action.delete">Delete</Translate>
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = ({ coQuanHanhChinh }: IRootState) => ({
  coQuanHanhChinhEntity: coQuanHanhChinh.entity
});

const mapDispatchToProps = { getEntity, deleteEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CoQuanHanhChinhDeleteDialog);
