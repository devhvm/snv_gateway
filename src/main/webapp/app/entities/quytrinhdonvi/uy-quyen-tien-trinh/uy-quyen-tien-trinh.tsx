import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction, getSortState, IPaginationBaseState, getPaginationItemsNumber, JhiPagination } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './uy-quyen-tien-trinh.reducer';
import { IUyQuyenTienTrinh } from 'app/shared/model/quytrinhdonvi/uy-quyen-tien-trinh.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IUyQuyenTienTrinhProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export type IUyQuyenTienTrinhState = IPaginationBaseState;

export class UyQuyenTienTrinh extends React.Component<IUyQuyenTienTrinhProps, IUyQuyenTienTrinhState> {
  state: IUyQuyenTienTrinhState = {
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
    const { uyQuyenTienTrinhList, match, totalItems } = this.props;
    return (
      <div>
        <h2 id="uy-quyen-tien-trinh-heading">
          <Translate contentKey="gatewayApp.quytrinhdonviUyQuyenTienTrinh.home.title">Uy Quyen Tien Trinhs</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="gatewayApp.quytrinhdonviUyQuyenTienTrinh.home.createLabel">Create new Uy Quyen Tien Trinh</Translate>
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
                  <Translate contentKey="gatewayApp.quytrinhdonviUyQuyenTienTrinh.tienTrinhCode">Tien Trinh Code</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('fromUserId')}>
                  <Translate contentKey="gatewayApp.quytrinhdonviUyQuyenTienTrinh.fromUserId">From User Id</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('toUserId')}>
                  <Translate contentKey="gatewayApp.quytrinhdonviUyQuyenTienTrinh.toUserId">To User Id</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('role')}>
                  <Translate contentKey="gatewayApp.quytrinhdonviUyQuyenTienTrinh.role">Role</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="gatewayApp.quytrinhdonviUyQuyenTienTrinh.quyTrinhDonVi">Quy Trinh Don Vi</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {uyQuyenTienTrinhList.map((uyQuyenTienTrinh, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${uyQuyenTienTrinh.id}`} color="link" size="sm">
                      {uyQuyenTienTrinh.id}
                    </Button>
                  </td>
                  <td>{uyQuyenTienTrinh.tienTrinhCode}</td>
                  <td>{uyQuyenTienTrinh.fromUserId}</td>
                  <td>{uyQuyenTienTrinh.toUserId}</td>
                  <td>{uyQuyenTienTrinh.role}</td>
                  <td>
                    {uyQuyenTienTrinh.quyTrinhDonViName ? (
                      <Link to={`quy-trinh-don-vi/${uyQuyenTienTrinh.quyTrinhDonViId}`}>{uyQuyenTienTrinh.quyTrinhDonViName}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${uyQuyenTienTrinh.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${uyQuyenTienTrinh.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${uyQuyenTienTrinh.id}/delete`} color="danger" size="sm">
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

const mapStateToProps = ({ uyQuyenTienTrinh }: IRootState) => ({
  uyQuyenTienTrinhList: uyQuyenTienTrinh.entities,
  totalItems: uyQuyenTienTrinh.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UyQuyenTienTrinh);
