import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction, getSortState, IPaginationBaseState, getPaginationItemsNumber, JhiPagination } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './loai-quy-trinh.reducer';
import { ILoaiQuyTrinh } from 'app/shared/model/quanlyquytrinh/loai-quy-trinh.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface ILoaiQuyTrinhProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export type ILoaiQuyTrinhState = IPaginationBaseState;

export class LoaiQuyTrinh extends React.Component<ILoaiQuyTrinhProps, ILoaiQuyTrinhState> {
  state: ILoaiQuyTrinhState = {
    ...getSortState(this.props.location, ITEMS_PER_PAGE)
  };

  componentDidMount() {
    this.getEntities();
  }

  sort = prop => () => {
    this.setState(
      {
        order: this.state.order === 'asc' ? 'desc' : 'asc',
        sort: prop
      },
      () => this.sortEntities()
    );
  };

  sortEntities() {
    this.getEntities();
    this.props.history.push(`${this.props.location.pathname}?page=${this.state.activePage}&sort=${this.state.sort},${this.state.order}`);
  }

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const { activePage, itemsPerPage, sort, order } = this.state;
    this.props.getEntities(activePage - 1, itemsPerPage, `${sort},${order}`);
  };

  render() {
    const { loaiQuyTrinhList, match, totalItems } = this.props;
    return (
      <div>
        <h2 id="loai-quy-trinh-heading">
          <Translate contentKey="gatewayApp.quanlyquytrinhLoaiQuyTrinh.home.title">Loai Quy Trinhs</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="gatewayApp.quanlyquytrinhLoaiQuyTrinh.home.createLabel">Create new Loai Quy Trinh</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={this.sort('id')}>
                  <Translate contentKey="global.field.id">ID</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('loaiQuyTrinhCode')}>
                  <Translate contentKey="gatewayApp.quanlyquytrinhLoaiQuyTrinh.loaiQuyTrinhCode">Loai Quy Trinh Code</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('methodName')}>
                  <Translate contentKey="gatewayApp.quanlyquytrinhLoaiQuyTrinh.methodName">Method Name</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('entityName')}>
                  <Translate contentKey="gatewayApp.quanlyquytrinhLoaiQuyTrinh.entityName">Entity Name</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('serviceName')}>
                  <Translate contentKey="gatewayApp.quanlyquytrinhLoaiQuyTrinh.serviceName">Service Name</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {loaiQuyTrinhList.map((loaiQuyTrinh, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${loaiQuyTrinh.id}`} color="link" size="sm">
                      {loaiQuyTrinh.id}
                    </Button>
                  </td>
                  <td>{loaiQuyTrinh.loaiQuyTrinhCode}</td>
                  <td>{loaiQuyTrinh.methodName}</td>
                  <td>{loaiQuyTrinh.entityName}</td>
                  <td>{loaiQuyTrinh.serviceName}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${loaiQuyTrinh.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${loaiQuyTrinh.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${loaiQuyTrinh.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        <Row className="justify-content-center">
          <JhiPagination
            items={getPaginationItemsNumber(totalItems, this.state.itemsPerPage)}
            activePage={this.state.activePage}
            onSelect={this.handlePagination}
            maxButtons={5}
          />
        </Row>
      </div>
    );
  }
}

const mapStateToProps = ({ loaiQuyTrinh }: IRootState) => ({
  loaiQuyTrinhList: loaiQuyTrinh.entities,
  totalItems: loaiQuyTrinh.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoaiQuyTrinh);
