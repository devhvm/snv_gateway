import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { ITienTrinh, defaultValue } from 'app/shared/model/quanlyquytrinh/tien-trinh.model';

export const ACTION_TYPES = {
  FETCH_TIENTRINH_LIST: 'tienTrinh/FETCH_TIENTRINH_LIST',
  FETCH_TIENTRINH: 'tienTrinh/FETCH_TIENTRINH',
  CREATE_TIENTRINH: 'tienTrinh/CREATE_TIENTRINH',
  UPDATE_TIENTRINH: 'tienTrinh/UPDATE_TIENTRINH',
  DELETE_TIENTRINH: 'tienTrinh/DELETE_TIENTRINH',
  RESET: 'tienTrinh/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ITienTrinh>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type TienTrinhState = Readonly<typeof initialState>;

// Reducer

export default (state: TienTrinhState = initialState, action): TienTrinhState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_TIENTRINH_LIST):
    case REQUEST(ACTION_TYPES.FETCH_TIENTRINH):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_TIENTRINH):
    case REQUEST(ACTION_TYPES.UPDATE_TIENTRINH):
    case REQUEST(ACTION_TYPES.DELETE_TIENTRINH):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_TIENTRINH_LIST):
    case FAILURE(ACTION_TYPES.FETCH_TIENTRINH):
    case FAILURE(ACTION_TYPES.CREATE_TIENTRINH):
    case FAILURE(ACTION_TYPES.UPDATE_TIENTRINH):
    case FAILURE(ACTION_TYPES.DELETE_TIENTRINH):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_TIENTRINH_LIST):
      return {
        ...state,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_TIENTRINH):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_TIENTRINH):
    case SUCCESS(ACTION_TYPES.UPDATE_TIENTRINH):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_TIENTRINH):
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

const apiUrl = 'quanlyquytrinh/api/tien-trinhs';

// Actions

export const getEntities: ICrudGetAllAction<ITienTrinh> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_TIENTRINH_LIST,
    payload: axios.get<ITienTrinh>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<ITienTrinh> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_TIENTRINH,
    payload: axios.get<ITienTrinh>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ITienTrinh> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_TIENTRINH,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ITienTrinh> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_TIENTRINH,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ITienTrinh> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_TIENTRINH,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
