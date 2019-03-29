import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { INhomPhanLoai, defaultValue } from 'app/shared/model/common/nhom-phan-loai.model';

export const ACTION_TYPES = {
  FETCH_NHOMPHANLOAI_LIST: 'nhomPhanLoai/FETCH_NHOMPHANLOAI_LIST',
  FETCH_NHOMPHANLOAI: 'nhomPhanLoai/FETCH_NHOMPHANLOAI',
  CREATE_NHOMPHANLOAI: 'nhomPhanLoai/CREATE_NHOMPHANLOAI',
  UPDATE_NHOMPHANLOAI: 'nhomPhanLoai/UPDATE_NHOMPHANLOAI',
  DELETE_NHOMPHANLOAI: 'nhomPhanLoai/DELETE_NHOMPHANLOAI',
  RESET: 'nhomPhanLoai/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<INhomPhanLoai>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type NhomPhanLoaiState = Readonly<typeof initialState>;

// Reducer

export default (state: NhomPhanLoaiState = initialState, action): NhomPhanLoaiState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_NHOMPHANLOAI_LIST):
    case REQUEST(ACTION_TYPES.FETCH_NHOMPHANLOAI):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_NHOMPHANLOAI):
    case REQUEST(ACTION_TYPES.UPDATE_NHOMPHANLOAI):
    case REQUEST(ACTION_TYPES.DELETE_NHOMPHANLOAI):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_NHOMPHANLOAI_LIST):
    case FAILURE(ACTION_TYPES.FETCH_NHOMPHANLOAI):
    case FAILURE(ACTION_TYPES.CREATE_NHOMPHANLOAI):
    case FAILURE(ACTION_TYPES.UPDATE_NHOMPHANLOAI):
    case FAILURE(ACTION_TYPES.DELETE_NHOMPHANLOAI):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_NHOMPHANLOAI_LIST):
      return {
        ...state,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_NHOMPHANLOAI):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_NHOMPHANLOAI):
    case SUCCESS(ACTION_TYPES.UPDATE_NHOMPHANLOAI):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_NHOMPHANLOAI):
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

const apiUrl = 'common/api/nhom-phan-loais';

// Actions

export const getEntities: ICrudGetAllAction<INhomPhanLoai> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_NHOMPHANLOAI_LIST,
    payload: axios.get<INhomPhanLoai>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<INhomPhanLoai> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_NHOMPHANLOAI,
    payload: axios.get<INhomPhanLoai>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<INhomPhanLoai> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_NHOMPHANLOAI,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<INhomPhanLoai> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_NHOMPHANLOAI,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<INhomPhanLoai> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_NHOMPHANLOAI,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
