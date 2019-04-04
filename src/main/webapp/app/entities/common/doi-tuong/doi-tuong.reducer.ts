import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { IDoiTuong, defaultValue } from 'app/shared/model/common/doi-tuong.model';

export const ACTION_TYPES = {
  FETCH_DOITUONG_LIST: 'doiTuong/FETCH_DOITUONG_LIST',
  FETCH_DOITUONG: 'doiTuong/FETCH_DOITUONG',
  CREATE_DOITUONG: 'doiTuong/CREATE_DOITUONG',
  UPDATE_DOITUONG: 'doiTuong/UPDATE_DOITUONG',
  DELETE_DOITUONG: 'doiTuong/DELETE_DOITUONG',
  RESET: 'doiTuong/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IDoiTuong>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type DoiTuongState = Readonly<typeof initialState>;

// Reducer

export default (state: DoiTuongState = initialState, action): DoiTuongState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_DOITUONG_LIST):
    case REQUEST(ACTION_TYPES.FETCH_DOITUONG):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_DOITUONG):
    case REQUEST(ACTION_TYPES.UPDATE_DOITUONG):
    case REQUEST(ACTION_TYPES.DELETE_DOITUONG):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_DOITUONG_LIST):
    case FAILURE(ACTION_TYPES.FETCH_DOITUONG):
    case FAILURE(ACTION_TYPES.CREATE_DOITUONG):
    case FAILURE(ACTION_TYPES.UPDATE_DOITUONG):
    case FAILURE(ACTION_TYPES.DELETE_DOITUONG):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_DOITUONG_LIST):
      return {
        ...state,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_DOITUONG):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_DOITUONG):
    case SUCCESS(ACTION_TYPES.UPDATE_DOITUONG):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_DOITUONG):
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

const apiUrl = 'common/api/doi-tuongs';

// Actions

export const getEntities: ICrudGetAllAction<IDoiTuong> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_DOITUONG_LIST,
    payload: axios.get<IDoiTuong>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IDoiTuong> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_DOITUONG,
    payload: axios.get<IDoiTuong>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IDoiTuong> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_DOITUONG,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IDoiTuong> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_DOITUONG,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IDoiTuong> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_DOITUONG,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
