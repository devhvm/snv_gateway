import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ITieuChi, defaultValue } from 'app/shared/model/donviphathanh/tieu-chi.model';

export const ACTION_TYPES = {
  FETCH_TIEUCHI_LIST: 'tieuChi/FETCH_TIEUCHI_LIST',
  FETCH_TIEUCHI: 'tieuChi/FETCH_TIEUCHI',
  CREATE_TIEUCHI: 'tieuChi/CREATE_TIEUCHI',
  UPDATE_TIEUCHI: 'tieuChi/UPDATE_TIEUCHI',
  DELETE_TIEUCHI: 'tieuChi/DELETE_TIEUCHI',
  RESET: 'tieuChi/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ITieuChi>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type TieuChiState = Readonly<typeof initialState>;

// Reducer

export default (state: TieuChiState = initialState, action): TieuChiState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_TIEUCHI_LIST):
    case REQUEST(ACTION_TYPES.FETCH_TIEUCHI):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_TIEUCHI):
    case REQUEST(ACTION_TYPES.UPDATE_TIEUCHI):
    case REQUEST(ACTION_TYPES.DELETE_TIEUCHI):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_TIEUCHI_LIST):
    case FAILURE(ACTION_TYPES.FETCH_TIEUCHI):
    case FAILURE(ACTION_TYPES.CREATE_TIEUCHI):
    case FAILURE(ACTION_TYPES.UPDATE_TIEUCHI):
    case FAILURE(ACTION_TYPES.DELETE_TIEUCHI):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_TIEUCHI_LIST):
      return {
        ...state,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_TIEUCHI):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_TIEUCHI):
    case SUCCESS(ACTION_TYPES.UPDATE_TIEUCHI):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_TIEUCHI):
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

const apiUrl = 'donviphathanh/api/tieu-chis';

// Actions

export const getEntities: ICrudGetAllAction<ITieuChi> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_TIEUCHI_LIST,
    payload: axios.get<ITieuChi>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<ITieuChi> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_TIEUCHI,
    payload: axios.get<ITieuChi>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ITieuChi> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_TIEUCHI,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ITieuChi> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_TIEUCHI,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ITieuChi> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_TIEUCHI,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
