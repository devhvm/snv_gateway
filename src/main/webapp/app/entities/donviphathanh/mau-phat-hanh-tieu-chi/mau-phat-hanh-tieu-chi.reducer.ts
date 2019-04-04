import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { IMauPhatHanhTieuChi, defaultValue } from 'app/shared/model/donviphathanh/mau-phat-hanh-tieu-chi.model';

export const ACTION_TYPES = {
  FETCH_MAUPHATHANHTIEUCHI_LIST: 'mauPhatHanhTieuChi/FETCH_MAUPHATHANHTIEUCHI_LIST',
  FETCH_MAUPHATHANHTIEUCHI: 'mauPhatHanhTieuChi/FETCH_MAUPHATHANHTIEUCHI',
  CREATE_MAUPHATHANHTIEUCHI: 'mauPhatHanhTieuChi/CREATE_MAUPHATHANHTIEUCHI',
  UPDATE_MAUPHATHANHTIEUCHI: 'mauPhatHanhTieuChi/UPDATE_MAUPHATHANHTIEUCHI',
  DELETE_MAUPHATHANHTIEUCHI: 'mauPhatHanhTieuChi/DELETE_MAUPHATHANHTIEUCHI',
  RESET: 'mauPhatHanhTieuChi/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IMauPhatHanhTieuChi>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type MauPhatHanhTieuChiState = Readonly<typeof initialState>;

// Reducer

export default (state: MauPhatHanhTieuChiState = initialState, action): MauPhatHanhTieuChiState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_MAUPHATHANHTIEUCHI_LIST):
    case REQUEST(ACTION_TYPES.FETCH_MAUPHATHANHTIEUCHI):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_MAUPHATHANHTIEUCHI):
    case REQUEST(ACTION_TYPES.UPDATE_MAUPHATHANHTIEUCHI):
    case REQUEST(ACTION_TYPES.DELETE_MAUPHATHANHTIEUCHI):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_MAUPHATHANHTIEUCHI_LIST):
    case FAILURE(ACTION_TYPES.FETCH_MAUPHATHANHTIEUCHI):
    case FAILURE(ACTION_TYPES.CREATE_MAUPHATHANHTIEUCHI):
    case FAILURE(ACTION_TYPES.UPDATE_MAUPHATHANHTIEUCHI):
    case FAILURE(ACTION_TYPES.DELETE_MAUPHATHANHTIEUCHI):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_MAUPHATHANHTIEUCHI_LIST):
      return {
        ...state,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_MAUPHATHANHTIEUCHI):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_MAUPHATHANHTIEUCHI):
    case SUCCESS(ACTION_TYPES.UPDATE_MAUPHATHANHTIEUCHI):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_MAUPHATHANHTIEUCHI):
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

const apiUrl = 'donviphathanh/api/mau-phat-hanh-tieu-chis';

// Actions

export const getEntities: ICrudGetAllAction<IMauPhatHanhTieuChi> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_MAUPHATHANHTIEUCHI_LIST,
    payload: axios.get<IMauPhatHanhTieuChi>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IMauPhatHanhTieuChi> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_MAUPHATHANHTIEUCHI,
    payload: axios.get<IMauPhatHanhTieuChi>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IMauPhatHanhTieuChi> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_MAUPHATHANHTIEUCHI,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IMauPhatHanhTieuChi> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_MAUPHATHANHTIEUCHI,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IMauPhatHanhTieuChi> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_MAUPHATHANHTIEUCHI,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
