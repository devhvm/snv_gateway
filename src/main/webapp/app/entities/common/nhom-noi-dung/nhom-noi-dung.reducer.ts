import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { INhomNoiDung, defaultValue } from 'app/shared/model/common/nhom-noi-dung.model';

export const ACTION_TYPES = {
  FETCH_NHOMNOIDUNG_LIST: 'nhomNoiDung/FETCH_NHOMNOIDUNG_LIST',
  FETCH_NHOMNOIDUNG: 'nhomNoiDung/FETCH_NHOMNOIDUNG',
  CREATE_NHOMNOIDUNG: 'nhomNoiDung/CREATE_NHOMNOIDUNG',
  UPDATE_NHOMNOIDUNG: 'nhomNoiDung/UPDATE_NHOMNOIDUNG',
  DELETE_NHOMNOIDUNG: 'nhomNoiDung/DELETE_NHOMNOIDUNG',
  RESET: 'nhomNoiDung/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<INhomNoiDung>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type NhomNoiDungState = Readonly<typeof initialState>;

// Reducer

export default (state: NhomNoiDungState = initialState, action): NhomNoiDungState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_NHOMNOIDUNG_LIST):
    case REQUEST(ACTION_TYPES.FETCH_NHOMNOIDUNG):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_NHOMNOIDUNG):
    case REQUEST(ACTION_TYPES.UPDATE_NHOMNOIDUNG):
    case REQUEST(ACTION_TYPES.DELETE_NHOMNOIDUNG):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_NHOMNOIDUNG_LIST):
    case FAILURE(ACTION_TYPES.FETCH_NHOMNOIDUNG):
    case FAILURE(ACTION_TYPES.CREATE_NHOMNOIDUNG):
    case FAILURE(ACTION_TYPES.UPDATE_NHOMNOIDUNG):
    case FAILURE(ACTION_TYPES.DELETE_NHOMNOIDUNG):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_NHOMNOIDUNG_LIST):
      return {
        ...state,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_NHOMNOIDUNG):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_NHOMNOIDUNG):
    case SUCCESS(ACTION_TYPES.UPDATE_NHOMNOIDUNG):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_NHOMNOIDUNG):
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

const apiUrl = 'common/api/nhom-noi-dungs';

// Actions

export const getEntities: ICrudGetAllAction<INhomNoiDung> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_NHOMNOIDUNG_LIST,
    payload: axios.get<INhomNoiDung>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<INhomNoiDung> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_NHOMNOIDUNG,
    payload: axios.get<INhomNoiDung>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<INhomNoiDung> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_NHOMNOIDUNG,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<INhomNoiDung> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_NHOMNOIDUNG,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<INhomNoiDung> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_NHOMNOIDUNG,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
