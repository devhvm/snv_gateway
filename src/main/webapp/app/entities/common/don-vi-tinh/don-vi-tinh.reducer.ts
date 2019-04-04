import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { IDonViTinh, defaultValue } from 'app/shared/model/common/don-vi-tinh.model';

export const ACTION_TYPES = {
  FETCH_DONVITINH_LIST: 'donViTinh/FETCH_DONVITINH_LIST',
  FETCH_DONVITINH: 'donViTinh/FETCH_DONVITINH',
  CREATE_DONVITINH: 'donViTinh/CREATE_DONVITINH',
  UPDATE_DONVITINH: 'donViTinh/UPDATE_DONVITINH',
  DELETE_DONVITINH: 'donViTinh/DELETE_DONVITINH',
  RESET: 'donViTinh/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IDonViTinh>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type DonViTinhState = Readonly<typeof initialState>;

// Reducer

export default (state: DonViTinhState = initialState, action): DonViTinhState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_DONVITINH_LIST):
    case REQUEST(ACTION_TYPES.FETCH_DONVITINH):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_DONVITINH):
    case REQUEST(ACTION_TYPES.UPDATE_DONVITINH):
    case REQUEST(ACTION_TYPES.DELETE_DONVITINH):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_DONVITINH_LIST):
    case FAILURE(ACTION_TYPES.FETCH_DONVITINH):
    case FAILURE(ACTION_TYPES.CREATE_DONVITINH):
    case FAILURE(ACTION_TYPES.UPDATE_DONVITINH):
    case FAILURE(ACTION_TYPES.DELETE_DONVITINH):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_DONVITINH_LIST):
      return {
        ...state,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_DONVITINH):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_DONVITINH):
    case SUCCESS(ACTION_TYPES.UPDATE_DONVITINH):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_DONVITINH):
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

const apiUrl = 'common/api/don-vi-tinhs';

// Actions

export const getEntities: ICrudGetAllAction<IDonViTinh> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_DONVITINH_LIST,
    payload: axios.get<IDonViTinh>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IDonViTinh> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_DONVITINH,
    payload: axios.get<IDonViTinh>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IDonViTinh> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_DONVITINH,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IDonViTinh> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_DONVITINH,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IDonViTinh> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_DONVITINH,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
