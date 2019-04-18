import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction, getSortState, IPaginationBaseState, getPaginationItemsNumber, JhiPagination } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './tien-trinh-xu-ly.reducer';
import { ITienTrinhXuLy } from 'app/shared/model/quanlyquytrinh/tien-trinh-xu-ly.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface ITienTrinhXuLyProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export type ITienTrinhXuLyState = IPaginationBaseState;

export class TienTrinhXuLy extends React.Component<ITienTrinhXuLyProps, ITienTrinhXuLyState> {
  state: ITienTrinhXuLyState = {
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
    const { tienTrinhXuLyList, match, totalItems } = this.props;
    return (
      <div>
        <h2 id="tien-trinh-xu-ly-heading">
          <Translate contentKey="gatewayApp.quanlyquytrinhTienTrinhXuLy.home.title">Tien Trinh Xu Lies</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="gatewayApp.quanlyquytrinhTienTrinhXuLy.home.createLabel">Create new Tien Trinh Xu Ly</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={this.sort('id')}>
                  <Translate contentKey="global.field.id">ID</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('batdauCode')}>
                  <Translate contentKey="gatewayApp.quanlyquytrinhTienTrinhXuLy.batdauCode">Batdau Code</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('ketThucCode')}>
                  <Translate contentKey="gatewayApp.quanlyquytrinhTienTrinhXuLy.ketThucCode">Ket Thuc Code</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="gatewayApp.quanlyquytrinhTienTrinhXuLy.tienTrinh">Tien Trinh</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {tienTrinhXuLyList.map((tienTrinhXuLy, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${tienTrinhXuLy.id}`} color="link" size="sm">
                      {tienTrinhXuLy.id}
                    </Button>
                  </td>
                  <td>{tienTrinhXuLy.batdauCode}</td>
                  <td>{tienTrinhXuLy.ketThucCode}</td>
                  <td>
                    {tienTrinhXuLy.tienTrinhName ? (
                      <Link to={`tien-trinh/${tienTrinhXuLy.tienTrinhId}`}>{tienTrinhXuLy.tienTrinhName}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${tienTrinhXuLy.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${tienTrinhXuLy.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${tienTrinhXuLy.id}/delete`} color="danger" size="sm">
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

const mapStateToProps = ({ tienTrinhXuLy }: IRootState) => ({
  tienTrinhXuLyList: tienTrinhXuLy.entities,
  totalItems: tienTrinhXuLy.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TienTrinhXuLy);
