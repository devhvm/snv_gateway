import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IDanhMuc, defaultValue } from 'app/shared/model/common/danh-muc.model';

export const ACTION_TYPES = {
  FETCH_DANHMUC_LIST: 'danhMuc/FETCH_DANHMUC_LIST',
  FETCH_DANHMUC: 'danhMuc/FETCH_DANHMUC',
  CREATE_DANHMUC: 'danhMuc/CREATE_DANHMUC',
  UPDATE_DANHMUC: 'danhMuc/UPDATE_DANHMUC',
  DELETE_DANHMUC: 'danhMuc/DELETE_DANHMUC',
  RESET: 'danhMuc/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IDanhMuc>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type DanhMucState = Readonly<typeof initialState>;

// Reducer

export default (state: DanhMucState = initialState, action): DanhMucState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_DANHMUC_LIST):
    case REQUEST(ACTION_TYPES.FETCH_DANHMUC):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_DANHMUC):
    case REQUEST(ACTION_TYPES.UPDATE_DANHMUC):
    case REQUEST(ACTION_TYPES.DELETE_DANHMUC):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_DANHMUC_LIST):
    case FAILURE(ACTION_TYPES.FETCH_DANHMUC):
    case FAILURE(ACTION_TYPES.CREATE_DANHMUC):
    case FAILURE(ACTION_TYPES.UPDATE_DANHMUC):
    case FAILURE(ACTION_TYPES.DELETE_DANHMUC):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_DANHMUC_LIST):
      return {
        ...state,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_DANHMUC):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_DANHMUC):
    case SUCCESS(ACTION_TYPES.UPDATE_DANHMUC):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_DANHMUC):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'common/api/danh-mucs';

// Actions

export const getEntities: ICrudGetAllAction<IDanhMuc> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_DANHMUC_LIST,
    payload: axios.get<IDanhMuc>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IDanhMuc> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_DANHMUC,
    payload: axios.get<IDanhMuc>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IDanhMuc> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_DANHMUC,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IDanhMuc> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_DANHMUC,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IDanhMuc> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_DANHMUC,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
