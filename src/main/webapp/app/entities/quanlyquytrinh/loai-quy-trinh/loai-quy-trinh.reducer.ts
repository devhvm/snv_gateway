import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { ILoaiQuyTrinh, defaultValue } from 'app/shared/model/quanlyquytrinh/loai-quy-trinh.model';

export const ACTION_TYPES = {
  FETCH_LOAIQUYTRINH_LIST: 'loaiQuyTrinh/FETCH_LOAIQUYTRINH_LIST',
  FETCH_LOAIQUYTRINH: 'loaiQuyTrinh/FETCH_LOAIQUYTRINH',
  CREATE_LOAIQUYTRINH: 'loaiQuyTrinh/CREATE_LOAIQUYTRINH',
  UPDATE_LOAIQUYTRINH: 'loaiQuyTrinh/UPDATE_LOAIQUYTRINH',
  DELETE_LOAIQUYTRINH: 'loaiQuyTrinh/DELETE_LOAIQUYTRINH',
  RESET: 'loaiQuyTrinh/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ILoaiQuyTrinh>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type LoaiQuyTrinhState = Readonly<typeof initialState>;

// Reducer

export default (state: LoaiQuyTrinhState = initialState, action): LoaiQuyTrinhState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_LOAIQUYTRINH_LIST):
    case REQUEST(ACTION_TYPES.FETCH_LOAIQUYTRINH):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_LOAIQUYTRINH):
    case REQUEST(ACTION_TYPES.UPDATE_LOAIQUYTRINH):
    case REQUEST(ACTION_TYPES.DELETE_LOAIQUYTRINH):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_LOAIQUYTRINH_LIST):
    case FAILURE(ACTION_TYPES.FETCH_LOAIQUYTRINH):
    case FAILURE(ACTION_TYPES.CREATE_LOAIQUYTRINH):
    case FAILURE(ACTION_TYPES.UPDATE_LOAIQUYTRINH):
    case FAILURE(ACTION_TYPES.DELETE_LOAIQUYTRINH):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_LOAIQUYTRINH_LIST):
      return {
        ...state,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_LOAIQUYTRINH):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_LOAIQUYTRINH):
    case SUCCESS(ACTION_TYPES.UPDATE_LOAIQUYTRINH):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_LOAIQUYTRINH):
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

const apiUrl = 'quanlyquytrinh/api/loai-quy-trinhs';

// Actions

export const getEntities: ICrudGetAllAction<ILoaiQuyTrinh> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_LOAIQUYTRINH_LIST,
    payload: axios.get<ILoaiQuyTrinh>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<ILoaiQuyTrinh> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_LOAIQUYTRINH,
    payload: axios.get<ILoaiQuyTrinh>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ILoaiQuyTrinh> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_LOAIQUYTRINH,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ILoaiQuyTrinh> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_LOAIQUYTRINH,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ILoaiQuyTrinh> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_LOAIQUYTRINH,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
