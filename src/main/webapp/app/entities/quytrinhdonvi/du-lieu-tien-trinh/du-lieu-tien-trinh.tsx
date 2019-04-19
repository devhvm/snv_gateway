import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction, getSortState, IPaginationBaseState, getPaginationItemsNumber, JhiPagination } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './du-lieu-tien-trinh.reducer';
import { IDuLieuTienTrinh } from 'app/shared/model/quytrinhdonvi/du-lieu-tien-trinh.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IDuLieuTienTrinhProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export type IDuLieuTienTrinhState = IPaginationBaseState;

export class DuLieuTienTrinh extends React.Component<IDuLieuTienTrinhProps, IDuLieuTienTrinhState> {
  state: IDuLieuTienTrinhState = {
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
    const { duLieuTienTrinhList, match, totalItems } = this.props;
    return (
      <div>
        <h2 id="du-lieu-tien-trinh-heading">
          <Translate contentKey="gatewayApp.quytrinhdonviDuLieuTienTrinh.home.title">Du Lieu Tien Trinhs</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="gatewayApp.quytrinhdonviDuLieuTienTrinh.home.createLabel">Create new Du Lieu Tien Trinh</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={this.sort('id')}>
                  <Translate contentKey="global.field.id">ID</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('tienTrinhCode')}>
                  <Translate contentKey="gatewayApp.quytrinhdonviDuLieuTienTrinh.tienTrinhCode">Tien Trinh Code</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('duLieuCode')}>
                  <Translate contentKey="gatewayApp.quytrinhdonviDuLieuTienTrinh.duLieuCode">Du Lieu Code</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('fromUserId')}>
                  <Translate contentKey="gatewayApp.quytrinhdonviDuLieuTienTrinh.fromUserId">From User Id</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('toUserId')}>
                  <Translate contentKey="gatewayApp.quytrinhdonviDuLieuTienTrinh.toUserId">To User Id</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('level')}>
                  <Translate contentKey="gatewayApp.quytrinhdonviDuLieuTienTrinh.level">Level</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('note')}>
                  <Translate contentKey="gatewayApp.quytrinhdonviDuLieuTienTrinh.note">Note</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="gatewayApp.quytrinhdonviDuLieuTienTrinh.quyTrinhDonVi">Quy Trinh Don Vi</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {duLieuTienTrinhList.map((duLieuTienTrinh, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${duLieuTienTrinh.id}`} color="link" size="sm">
                      {duLieuTienTrinh.id}
                    </Button>
                  </td>
                  <td>{duLieuTienTrinh.tienTrinhCode}</td>
                  <td>{duLieuTienTrinh.duLieuCode}</td>
                  <td>{duLieuTienTrinh.fromUserId}</td>
                  <td>{duLieuTienTrinh.toUserId}</td>
                  <td>{duLieuTienTrinh.level}</td>
                  <td>{duLieuTienTrinh.note}</td>
                  <td>
                    {duLieuTienTrinh.quyTrinhDonViName ? (
                      <Link to={`quy-trinh-don-vi/${duLieuTienTrinh.quyTrinhDonViId}`}>{duLieuTienTrinh.quyTrinhDonViName}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${duLieuTienTrinh.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${duLieuTienTrinh.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${duLieuTienTrinh.id}/delete`} color="danger" size="sm">
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

const mapStateToProps = ({ duLieuTienTrinh }: IRootState) => ({
  duLieuTienTrinhList: duLieuTienTrinh.entities,
  totalItems: duLieuTienTrinh.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DuLieuTienTrinh);
