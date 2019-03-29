import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import {
  Translate,
  ICrudGetAllAction,
  TextFormat,
  getSortState,
  IPaginationBaseState,
  getPaginationItemsNumber,
  JhiPagination
} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './nhom-chi-tieu.reducer';
import { INhomChiTieu } from 'app/shared/model/common/nhom-chi-tieu.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface INhomChiTieuProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export type INhomChiTieuState = IPaginationBaseState;

export class NhomChiTieu extends React.Component<INhomChiTieuProps, INhomChiTieuState> {
  state: INhomChiTieuState = {
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
    const { nhomChiTieuList, match, totalItems } = this.props;
    return (
      <div>
        <h2 id="nhom-chi-tieu-heading">
          <Translate contentKey="gatewayApp.commonNhomChiTieu.home.title">Nhom Chi Tieus</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="gatewayApp.commonNhomChiTieu.home.createLabel">Create new Nhom Chi Tieu</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={this.sort('id')}>
                  <Translate contentKey="global.field.id">ID</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('nhomChiTieuCode')}>
                  <Translate contentKey="gatewayApp.commonNhomChiTieu.nhomChiTieuCode">Nhom Chi Tieu Code</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('name')}>
                  <Translate contentKey="gatewayApp.commonNhomChiTieu.name">Name</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('userName')}>
                  <Translate contentKey="gatewayApp.commonNhomChiTieu.userName">User Name</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('createTime')}>
                  <Translate contentKey="gatewayApp.commonNhomChiTieu.createTime">Create Time</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('updateTime')}>
                  <Translate contentKey="gatewayApp.commonNhomChiTieu.updateTime">Update Time</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('status')}>
                  <Translate contentKey="gatewayApp.commonNhomChiTieu.status">Status</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('program')}>
                  <Translate contentKey="gatewayApp.commonNhomChiTieu.program">Program</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {nhomChiTieuList.map((nhomChiTieu, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${nhomChiTieu.id}`} color="link" size="sm">
                      {nhomChiTieu.id}
                    </Button>
                  </td>
                  <td>{nhomChiTieu.nhomChiTieuCode}</td>
                  <td>{nhomChiTieu.name}</td>
                  <td>{nhomChiTieu.userName}</td>
                  <td>
                    <TextFormat type="date" value={nhomChiTieu.createTime} format={APP_DATE_FORMAT} />
                  </td>
                  <td>
                    <TextFormat type="date" value={nhomChiTieu.updateTime} format={APP_DATE_FORMAT} />
                  </td>
                  <td>
                    <Translate contentKey={`gatewayApp.Status.${nhomChiTieu.status}`} />
                  </td>
                  <td>{nhomChiTieu.program}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${nhomChiTieu.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${nhomChiTieu.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${nhomChiTieu.id}/delete`} color="danger" size="sm">
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

const mapStateToProps = ({ nhomChiTieu }: IRootState) => ({
  nhomChiTieuList: nhomChiTieu.entities,
  totalItems: nhomChiTieu.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NhomChiTieu);
