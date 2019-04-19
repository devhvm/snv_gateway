import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { IDuLieuTienTrinh, defaultValue } from 'app/shared/model/quytrinhdonvi/du-lieu-tien-trinh.model';

export const ACTION_TYPES = {
  FETCH_DULIEUTIENTRINH_LIST: 'duLieuTienTrinh/FETCH_DULIEUTIENTRINH_LIST',
  FETCH_DULIEUTIENTRINH: 'duLieuTienTrinh/FETCH_DULIEUTIENTRINH',
  CREATE_DULIEUTIENTRINH: 'duLieuTienTrinh/CREATE_DULIEUTIENTRINH',
  UPDATE_DULIEUTIENTRINH: 'duLieuTienTrinh/UPDATE_DULIEUTIENTRINH',
  DELETE_DULIEUTIENTRINH: 'duLieuTienTrinh/DELETE_DULIEUTIENTRINH',
  RESET: 'duLieuTienTrinh/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IDuLieuTienTrinh>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type DuLieuTienTrinhState = Readonly<typeof initialState>;

// Reducer

export default (state: DuLieuTienTrinhState = initialState, action): DuLieuTienTrinhState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_DULIEUTIENTRINH_LIST):
    case REQUEST(ACTION_TYPES.FETCH_DULIEUTIENTRINH):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_DULIEUTIENTRINH):
    case REQUEST(ACTION_TYPES.UPDATE_DULIEUTIENTRINH):
    case REQUEST(ACTION_TYPES.DELETE_DULIEUTIENTRINH):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_DULIEUTIENTRINH_LIST):
    case FAILURE(ACTION_TYPES.FETCH_DULIEUTIENTRINH):
    case FAILURE(ACTION_TYPES.CREATE_DULIEUTIENTRINH):
    case FAILURE(ACTION_TYPES.UPDATE_DULIEUTIENTRINH):
    case FAILURE(ACTION_TYPES.DELETE_DULIEUTIENTRINH):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_DULIEUTIENTRINH_LIST):
      return {
        ...state,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_DULIEUTIENTRINH):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_DULIEUTIENTRINH):
    case SUCCESS(ACTION_TYPES.UPDATE_DULIEUTIENTRINH):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_DULIEUTIENTRINH):
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

const apiUrl = 'quytrinhdonvi/api/du-lieu-tien-trinhs';

// Actions

export const getEntities: ICrudGetAllAction<IDuLieuTienTrinh> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_DULIEUTIENTRINH_LIST,
    payload: axios.get<IDuLieuTienTrinh>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IDuLieuTienTrinh> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_DULIEUTIENTRINH,
    payload: axios.get<IDuLieuTienTrinh>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IDuLieuTienTrinh> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_DULIEUTIENTRINH,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IDuLieuTienTrinh> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_DULIEUTIENTRINH,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IDuLieuTienTrinh> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_DULIEUTIENTRINH,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
