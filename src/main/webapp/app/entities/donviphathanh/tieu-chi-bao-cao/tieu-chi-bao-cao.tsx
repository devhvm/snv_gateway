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
import { getEntities } from './tieu-chi-bao-cao.reducer';
import { ITieuChiBaoCao } from 'app/shared/model/donviphathanh/tieu-chi-bao-cao.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface ITieuChiBaoCaoProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export type ITieuChiBaoCaoState = IPaginationBaseState;

export class TieuChiBaoCao extends React.Component<ITieuChiBaoCaoProps, ITieuChiBaoCaoState> {
  state: ITieuChiBaoCaoState = {
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
    const { tieuChiBaoCaoList, match, totalItems } = this.props;
    return (
      <div>
        <h2 id="tieu-chi-bao-cao-heading">
          <Translate contentKey="gatewayApp.donviphathanhTieuChiBaoCao.home.title">Tieu Chi Bao Caos</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="gatewayApp.donviphathanhTieuChiBaoCao.home.createLabel">Create new Tieu Chi Bao Cao</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={this.sort('id')}>
                  <Translate contentKey="global.field.id">ID</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('tieuChiBaoCaoCode')}>
                  <Translate contentKey="gatewayApp.donviphathanhTieuChiBaoCao.tieuChiBaoCaoCode">Tieu Chi Bao Cao Code</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('userName')}>
                  <Translate contentKey="gatewayApp.donviphathanhTieuChiBaoCao.userName">User Name</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('createTime')}>
                  <Translate contentKey="gatewayApp.donviphathanhTieuChiBaoCao.createTime">Create Time</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('updateTime')}>
                  <Translate contentKey="gatewayApp.donviphathanhTieuChiBaoCao.updateTime">Update Time</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('status')}>
                  <Translate contentKey="gatewayApp.donviphathanhTieuChiBaoCao.status">Status</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('program')}>
                  <Translate contentKey="gatewayApp.donviphathanhTieuChiBaoCao.program">Program</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="gatewayApp.donviphathanhTieuChiBaoCao.tieuchi">Tieuchi</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {tieuChiBaoCaoList.map((tieuChiBaoCao, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${tieuChiBaoCao.id}`} color="link" size="sm">
                      {tieuChiBaoCao.id}
                    </Button>
                  </td>
                  <td>{tieuChiBaoCao.tieuChiBaoCaoCode}</td>
                  <td>{tieuChiBaoCao.userName}</td>
                  <td>
                    <TextFormat type="date" value={tieuChiBaoCao.createTime} format={APP_DATE_FORMAT} />
                  </td>
                  <td>
                    <TextFormat type="date" value={tieuChiBaoCao.updateTime} format={APP_DATE_FORMAT} />
                  </td>
                  <td>
                    <Translate contentKey={`gatewayApp.ReportStatus.${tieuChiBaoCao.status}`} />
                  </td>
                  <td>{tieuChiBaoCao.program}</td>
                  <td>
                    {tieuChiBaoCao.tieuchiId ? <Link to={`tieu-chi/${tieuChiBaoCao.tieuchiId}`}>{tieuChiBaoCao.tieuchiId}</Link> : ''}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${tieuChiBaoCao.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${tieuChiBaoCao.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${tieuChiBaoCao.id}/delete`} color="danger" size="sm">
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

const mapStateToProps = ({ tieuChiBaoCao }: IRootState) => ({
  tieuChiBaoCaoList: tieuChiBaoCao.entities,
  totalItems: tieuChiBaoCao.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TieuChiBaoCao);
