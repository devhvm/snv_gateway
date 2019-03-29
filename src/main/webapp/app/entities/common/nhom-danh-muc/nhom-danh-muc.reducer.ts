import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { INhomDanhMuc, defaultValue } from 'app/shared/model/common/nhom-danh-muc.model';

export const ACTION_TYPES = {
  FETCH_NHOMDANHMUC_LIST: 'nhomDanhMuc/FETCH_NHOMDANHMUC_LIST',
  FETCH_NHOMDANHMUC: 'nhomDanhMuc/FETCH_NHOMDANHMUC',
  CREATE_NHOMDANHMUC: 'nhomDanhMuc/CREATE_NHOMDANHMUC',
  UPDATE_NHOMDANHMUC: 'nhomDanhMuc/UPDATE_NHOMDANHMUC',
  DELETE_NHOMDANHMUC: 'nhomDanhMuc/DELETE_NHOMDANHMUC',
  RESET: 'nhomDanhMuc/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<INhomDanhMuc>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type NhomDanhMucState = Readonly<typeof initialState>;

// Reducer

export default (state: NhomDanhMucState = initialState, action): NhomDanhMucState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_NHOMDANHMUC_LIST):
    case REQUEST(ACTION_TYPES.FETCH_NHOMDANHMUC):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_NHOMDANHMUC):
    case REQUEST(ACTION_TYPES.UPDATE_NHOMDANHMUC):
    case REQUEST(ACTION_TYPES.DELETE_NHOMDANHMUC):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_NHOMDANHMUC_LIST):
    case FAILURE(ACTION_TYPES.FETCH_NHOMDANHMUC):
    case FAILURE(ACTION_TYPES.CREATE_NHOMDANHMUC):
    case FAILURE(ACTION_TYPES.UPDATE_NHOMDANHMUC):
    case FAILURE(ACTION_TYPES.DELETE_NHOMDANHMUC):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_NHOMDANHMUC_LIST):
      return {
        ...state,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_NHOMDANHMUC):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_NHOMDANHMUC):
    case SUCCESS(ACTION_TYPES.UPDATE_NHOMDANHMUC):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_NHOMDANHMUC):
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

const apiUrl = 'common/api/nhom-danh-mucs';

// Actions

export const getEntities: ICrudGetAllAction<INhomDanhMuc> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_NHOMDANHMUC_LIST,
    payload: axios.get<INhomDanhMuc>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<INhomDanhMuc> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_NHOMDANHMUC,
    payload: axios.get<INhomDanhMuc>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<INhomDanhMuc> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_NHOMDANHMUC,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<INhomDanhMuc> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_NHOMDANHMUC,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<INhomDanhMuc> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_NHOMDANHMUC,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
