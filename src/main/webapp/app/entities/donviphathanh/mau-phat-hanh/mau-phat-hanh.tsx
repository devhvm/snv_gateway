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
import { getEntities } from './mau-phat-hanh.reducer';
import { IMauPhatHanh } from 'app/shared/model/donviphathanh/mau-phat-hanh.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IMauPhatHanhProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export type IMauPhatHanhState = IPaginationBaseState;

export class MauPhatHanh extends React.Component<IMauPhatHanhProps, IMauPhatHanhState> {
  state: IMauPhatHanhState = {
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
    const { mauPhatHanhList, match, totalItems } = this.props;
    return (
      <div>
        <h2 id="mau-phat-hanh-heading">
          <Translate contentKey="gatewayApp.donviphathanhMauPhatHanh.home.title">Mau Phat Hanhs</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="gatewayApp.donviphathanhMauPhatHanh.home.createLabel">Create new Mau Phat Hanh</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={this.sort('id')}>
                  <Translate contentKey="global.field.id">ID</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('mauPhatHanhCode')}>
                  <Translate contentKey="gatewayApp.donviphathanhMauPhatHanh.mauPhatHanhCode">Mau Phat Hanh Code</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('name')}>
                  <Translate contentKey="gatewayApp.donviphathanhMauPhatHanh.name">Name</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('userName')}>
                  <Translate contentKey="gatewayApp.donviphathanhMauPhatHanh.userName">User Name</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('createTime')}>
                  <Translate contentKey="gatewayApp.donviphathanhMauPhatHanh.createTime">Create Time</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('updateTime')}>
                  <Translate contentKey="gatewayApp.donviphathanhMauPhatHanh.updateTime">Update Time</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('status')}>
                  <Translate contentKey="gatewayApp.donviphathanhMauPhatHanh.status">Status</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('program')}>
                  <Translate contentKey="gatewayApp.donviphathanhMauPhatHanh.program">Program</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {mauPhatHanhList.map((mauPhatHanh, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${mauPhatHanh.id}`} color="link" size="sm">
                      {mauPhatHanh.id}
                    </Button>
                  </td>
                  <td>{mauPhatHanh.mauPhatHanhCode}</td>
                  <td>{mauPhatHanh.name}</td>
                  <td>{mauPhatHanh.userName}</td>
                  <td>
                    <TextFormat type="date" value={mauPhatHanh.createTime} format={APP_DATE_FORMAT} />
                  </td>
                  <td>
                    <TextFormat type="date" value={mauPhatHanh.updateTime} format={APP_DATE_FORMAT} />
                  </td>
                  <td>
                    <Translate contentKey={`gatewayApp.ReportStatus.${mauPhatHanh.status}`} />
                  </td>
                  <td>{mauPhatHanh.program}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${mauPhatHanh.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${mauPhatHanh.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${mauPhatHanh.id}/delete`} color="danger" size="sm">
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

const mapStateToProps = ({ mauPhatHanh }: IRootState) => ({
  mauPhatHanhList: mauPhatHanh.entities,
  totalItems: mauPhatHanh.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MauPhatHanh);
