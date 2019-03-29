import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { INoiDung, defaultValue } from 'app/shared/model/common/noi-dung.model';

export const ACTION_TYPES = {
  FETCH_NOIDUNG_LIST: 'noiDung/FETCH_NOIDUNG_LIST',
  FETCH_NOIDUNG: 'noiDung/FETCH_NOIDUNG',
  CREATE_NOIDUNG: 'noiDung/CREATE_NOIDUNG',
  UPDATE_NOIDUNG: 'noiDung/UPDATE_NOIDUNG',
  DELETE_NOIDUNG: 'noiDung/DELETE_NOIDUNG',
  RESET: 'noiDung/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<INoiDung>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type NoiDungState = Readonly<typeof initialState>;

// Reducer

export default (state: NoiDungState = initialState, action): NoiDungState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_NOIDUNG_LIST):
    case REQUEST(ACTION_TYPES.FETCH_NOIDUNG):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_NOIDUNG):
    case REQUEST(ACTION_TYPES.UPDATE_NOIDUNG):
    case REQUEST(ACTION_TYPES.DELETE_NOIDUNG):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_NOIDUNG_LIST):
    case FAILURE(ACTION_TYPES.FETCH_NOIDUNG):
    case FAILURE(ACTION_TYPES.CREATE_NOIDUNG):
    case FAILURE(ACTION_TYPES.UPDATE_NOIDUNG):
    case FAILURE(ACTION_TYPES.DELETE_NOIDUNG):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_NOIDUNG_LIST):
      return {
        ...state,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_NOIDUNG):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_NOIDUNG):
    case SUCCESS(ACTION_TYPES.UPDATE_NOIDUNG):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_NOIDUNG):
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

const apiUrl = 'common/api/noi-dungs';

// Actions

export const getEntities: ICrudGetAllAction<INoiDung> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_NOIDUNG_LIST,
    payload: axios.get<INoiDung>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<INoiDung> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_NOIDUNG,
    payload: axios.get<INoiDung>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<INoiDung> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_NOIDUNG,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<INoiDung> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_NOIDUNG,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<INoiDung> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_NOIDUNG,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
