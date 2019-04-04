import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { IKyCongBo, defaultValue } from 'app/shared/model/donviphathanh/ky-cong-bo.model';

export const ACTION_TYPES = {
  FETCH_KYCONGBO_LIST: 'kyCongBo/FETCH_KYCONGBO_LIST',
  FETCH_KYCONGBO: 'kyCongBo/FETCH_KYCONGBO',
  CREATE_KYCONGBO: 'kyCongBo/CREATE_KYCONGBO',
  UPDATE_KYCONGBO: 'kyCongBo/UPDATE_KYCONGBO',
  DELETE_KYCONGBO: 'kyCongBo/DELETE_KYCONGBO',
  RESET: 'kyCongBo/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IKyCongBo>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type KyCongBoState = Readonly<typeof initialState>;

// Reducer

export default (state: KyCongBoState = initialState, action): KyCongBoState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_KYCONGBO_LIST):
    case REQUEST(ACTION_TYPES.FETCH_KYCONGBO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_KYCONGBO):
    case REQUEST(ACTION_TYPES.UPDATE_KYCONGBO):
    case REQUEST(ACTION_TYPES.DELETE_KYCONGBO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_KYCONGBO_LIST):
    case FAILURE(ACTION_TYPES.FETCH_KYCONGBO):
    case FAILURE(ACTION_TYPES.CREATE_KYCONGBO):
    case FAILURE(ACTION_TYPES.UPDATE_KYCONGBO):
    case FAILURE(ACTION_TYPES.DELETE_KYCONGBO):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_KYCONGBO_LIST):
      return {
        ...state,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_KYCONGBO):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_KYCONGBO):
    case SUCCESS(ACTION_TYPES.UPDATE_KYCONGBO):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_KYCONGBO):
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

const apiUrl = 'donviphathanh/api/ky-cong-bos';

// Actions

export const getEntities: ICrudGetAllAction<IKyCongBo> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_KYCONGBO_LIST,
    payload: axios.get<IKyCongBo>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IKyCongBo> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_KYCONGBO,
    payload: axios.get<IKyCongBo>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IKyCongBo> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_KYCONGBO,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IKyCongBo> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_KYCONGBO,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IKyCongBo> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_KYCONGBO,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
