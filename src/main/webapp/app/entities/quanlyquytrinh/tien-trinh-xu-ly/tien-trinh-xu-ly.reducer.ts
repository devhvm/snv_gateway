import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { ITienTrinhXuLy, defaultValue } from 'app/shared/model/quanlyquytrinh/tien-trinh-xu-ly.model';

export const ACTION_TYPES = {
  FETCH_TIENTRINHXULY_LIST: 'tienTrinhXuLy/FETCH_TIENTRINHXULY_LIST',
  FETCH_TIENTRINHXULY: 'tienTrinhXuLy/FETCH_TIENTRINHXULY',
  CREATE_TIENTRINHXULY: 'tienTrinhXuLy/CREATE_TIENTRINHXULY',
  UPDATE_TIENTRINHXULY: 'tienTrinhXuLy/UPDATE_TIENTRINHXULY',
  DELETE_TIENTRINHXULY: 'tienTrinhXuLy/DELETE_TIENTRINHXULY',
  RESET: 'tienTrinhXuLy/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ITienTrinhXuLy>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type TienTrinhXuLyState = Readonly<typeof initialState>;

// Reducer

export default (state: TienTrinhXuLyState = initialState, action): TienTrinhXuLyState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_TIENTRINHXULY_LIST):
    case REQUEST(ACTION_TYPES.FETCH_TIENTRINHXULY):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_TIENTRINHXULY):
    case REQUEST(ACTION_TYPES.UPDATE_TIENTRINHXULY):
    case REQUEST(ACTION_TYPES.DELETE_TIENTRINHXULY):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_TIENTRINHXULY_LIST):
    case FAILURE(ACTION_TYPES.FETCH_TIENTRINHXULY):
    case FAILURE(ACTION_TYPES.CREATE_TIENTRINHXULY):
    case FAILURE(ACTION_TYPES.UPDATE_TIENTRINHXULY):
    case FAILURE(ACTION_TYPES.DELETE_TIENTRINHXULY):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_TIENTRINHXULY_LIST):
      return {
        ...state,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_TIENTRINHXULY):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_TIENTRINHXULY):
    case SUCCESS(ACTION_TYPES.UPDATE_TIENTRINHXULY):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_TIENTRINHXULY):
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

const apiUrl = 'quanlyquytrinh/api/tien-trinh-xu-lies';

// Actions

export const getEntities: ICrudGetAllAction<ITienTrinhXuLy> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_TIENTRINHXULY_LIST,
    payload: axios.get<ITienTrinhXuLy>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<ITienTrinhXuLy> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_TIENTRINHXULY,
    payload: axios.get<ITienTrinhXuLy>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ITienTrinhXuLy> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_TIENTRINHXULY,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ITienTrinhXuLy> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_TIENTRINHXULY,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ITienTrinhXuLy> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_TIENTRINHXULY,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
