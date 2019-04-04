import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { IPhamVi, defaultValue } from 'app/shared/model/donviphathanh/pham-vi.model';

export const ACTION_TYPES = {
  FETCH_PHAMVI_LIST: 'phamVi/FETCH_PHAMVI_LIST',
  FETCH_PHAMVI: 'phamVi/FETCH_PHAMVI',
  CREATE_PHAMVI: 'phamVi/CREATE_PHAMVI',
  UPDATE_PHAMVI: 'phamVi/UPDATE_PHAMVI',
  DELETE_PHAMVI: 'phamVi/DELETE_PHAMVI',
  RESET: 'phamVi/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IPhamVi>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type PhamViState = Readonly<typeof initialState>;

// Reducer

export default (state: PhamViState = initialState, action): PhamViState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PHAMVI_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PHAMVI):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_PHAMVI):
    case REQUEST(ACTION_TYPES.UPDATE_PHAMVI):
    case REQUEST(ACTION_TYPES.DELETE_PHAMVI):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_PHAMVI_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PHAMVI):
    case FAILURE(ACTION_TYPES.CREATE_PHAMVI):
    case FAILURE(ACTION_TYPES.UPDATE_PHAMVI):
    case FAILURE(ACTION_TYPES.DELETE_PHAMVI):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_PHAMVI_LIST):
      return {
        ...state,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_PHAMVI):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_PHAMVI):
    case SUCCESS(ACTION_TYPES.UPDATE_PHAMVI):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_PHAMVI):
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

const apiUrl = 'donviphathanh/api/pham-vis';

// Actions

export const getEntities: ICrudGetAllAction<IPhamVi> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_PHAMVI_LIST,
    payload: axios.get<IPhamVi>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IPhamVi> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PHAMVI,
    payload: axios.get<IPhamVi>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IPhamVi> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PHAMVI,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IPhamVi> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PHAMVI,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IPhamVi> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PHAMVI,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
