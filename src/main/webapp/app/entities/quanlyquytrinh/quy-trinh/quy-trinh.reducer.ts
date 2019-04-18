import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { IQuyTrinh, defaultValue } from 'app/shared/model/quanlyquytrinh/quy-trinh.model';

export const ACTION_TYPES = {
  FETCH_QUYTRINH_LIST: 'quyTrinh/FETCH_QUYTRINH_LIST',
  FETCH_QUYTRINH: 'quyTrinh/FETCH_QUYTRINH',
  CREATE_QUYTRINH: 'quyTrinh/CREATE_QUYTRINH',
  UPDATE_QUYTRINH: 'quyTrinh/UPDATE_QUYTRINH',
  DELETE_QUYTRINH: 'quyTrinh/DELETE_QUYTRINH',
  RESET: 'quyTrinh/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IQuyTrinh>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type QuyTrinhState = Readonly<typeof initialState>;

// Reducer

export default (state: QuyTrinhState = initialState, action): QuyTrinhState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_QUYTRINH_LIST):
    case REQUEST(ACTION_TYPES.FETCH_QUYTRINH):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_QUYTRINH):
    case REQUEST(ACTION_TYPES.UPDATE_QUYTRINH):
    case REQUEST(ACTION_TYPES.DELETE_QUYTRINH):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_QUYTRINH_LIST):
    case FAILURE(ACTION_TYPES.FETCH_QUYTRINH):
    case FAILURE(ACTION_TYPES.CREATE_QUYTRINH):
    case FAILURE(ACTION_TYPES.UPDATE_QUYTRINH):
    case FAILURE(ACTION_TYPES.DELETE_QUYTRINH):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_QUYTRINH_LIST):
      return {
        ...state,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_QUYTRINH):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_QUYTRINH):
    case SUCCESS(ACTION_TYPES.UPDATE_QUYTRINH):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_QUYTRINH):
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

const apiUrl = 'quanlyquytrinh/api/quy-trinhs';

// Actions

export const getEntities: ICrudGetAllAction<IQuyTrinh> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_QUYTRINH_LIST,
    payload: axios.get<IQuyTrinh>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IQuyTrinh> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_QUYTRINH,
    payload: axios.get<IQuyTrinh>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IQuyTrinh> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_QUYTRINH,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IQuyTrinh> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_QUYTRINH,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IQuyTrinh> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_QUYTRINH,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
