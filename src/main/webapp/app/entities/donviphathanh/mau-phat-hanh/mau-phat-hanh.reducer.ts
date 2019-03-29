import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IMauPhatHanh, defaultValue } from 'app/shared/model/donviphathanh/mau-phat-hanh.model';

export const ACTION_TYPES = {
  FETCH_MAUPHATHANH_LIST: 'mauPhatHanh/FETCH_MAUPHATHANH_LIST',
  FETCH_MAUPHATHANH: 'mauPhatHanh/FETCH_MAUPHATHANH',
  CREATE_MAUPHATHANH: 'mauPhatHanh/CREATE_MAUPHATHANH',
  UPDATE_MAUPHATHANH: 'mauPhatHanh/UPDATE_MAUPHATHANH',
  DELETE_MAUPHATHANH: 'mauPhatHanh/DELETE_MAUPHATHANH',
  RESET: 'mauPhatHanh/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IMauPhatHanh>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type MauPhatHanhState = Readonly<typeof initialState>;

// Reducer

export default (state: MauPhatHanhState = initialState, action): MauPhatHanhState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_MAUPHATHANH_LIST):
    case REQUEST(ACTION_TYPES.FETCH_MAUPHATHANH):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_MAUPHATHANH):
    case REQUEST(ACTION_TYPES.UPDATE_MAUPHATHANH):
    case REQUEST(ACTION_TYPES.DELETE_MAUPHATHANH):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_MAUPHATHANH_LIST):
    case FAILURE(ACTION_TYPES.FETCH_MAUPHATHANH):
    case FAILURE(ACTION_TYPES.CREATE_MAUPHATHANH):
    case FAILURE(ACTION_TYPES.UPDATE_MAUPHATHANH):
    case FAILURE(ACTION_TYPES.DELETE_MAUPHATHANH):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_MAUPHATHANH_LIST):
      return {
        ...state,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_MAUPHATHANH):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_MAUPHATHANH):
    case SUCCESS(ACTION_TYPES.UPDATE_MAUPHATHANH):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_MAUPHATHANH):
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

const apiUrl = 'donviphathanh/api/mau-phat-hanhs';

// Actions

export const getEntities: ICrudGetAllAction<IMauPhatHanh> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_MAUPHATHANH_LIST,
    payload: axios.get<IMauPhatHanh>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IMauPhatHanh> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_MAUPHATHANH,
    payload: axios.get<IMauPhatHanh>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IMauPhatHanh> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_MAUPHATHANH,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IMauPhatHanh> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_MAUPHATHANH,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IMauPhatHanh> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_MAUPHATHANH,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
