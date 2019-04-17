import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { IAcessDeny, defaultValue } from 'app/shared/model/phanquyenchucnang/acess-deny.model';

export const ACTION_TYPES = {
  FETCH_ACESSDENY_LIST: 'acessDeny/FETCH_ACESSDENY_LIST',
  FETCH_ACESSDENY: 'acessDeny/FETCH_ACESSDENY',
  CREATE_ACESSDENY: 'acessDeny/CREATE_ACESSDENY',
  UPDATE_ACESSDENY: 'acessDeny/UPDATE_ACESSDENY',
  DELETE_ACESSDENY: 'acessDeny/DELETE_ACESSDENY',
  RESET: 'acessDeny/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IAcessDeny>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type AcessDenyState = Readonly<typeof initialState>;

// Reducer

export default (state: AcessDenyState = initialState, action): AcessDenyState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_ACESSDENY_LIST):
    case REQUEST(ACTION_TYPES.FETCH_ACESSDENY):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_ACESSDENY):
    case REQUEST(ACTION_TYPES.UPDATE_ACESSDENY):
    case REQUEST(ACTION_TYPES.DELETE_ACESSDENY):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_ACESSDENY_LIST):
    case FAILURE(ACTION_TYPES.FETCH_ACESSDENY):
    case FAILURE(ACTION_TYPES.CREATE_ACESSDENY):
    case FAILURE(ACTION_TYPES.UPDATE_ACESSDENY):
    case FAILURE(ACTION_TYPES.DELETE_ACESSDENY):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_ACESSDENY_LIST):
      return {
        ...state,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_ACESSDENY):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_ACESSDENY):
    case SUCCESS(ACTION_TYPES.UPDATE_ACESSDENY):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_ACESSDENY):
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

const apiUrl = 'phanquyenchucnang/api/acess-denies';

// Actions

export const getEntities: ICrudGetAllAction<IAcessDeny> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_ACESSDENY_LIST,
    payload: axios.get<IAcessDeny>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IAcessDeny> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_ACESSDENY,
    payload: axios.get<IAcessDeny>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IAcessDeny> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_ACESSDENY,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IAcessDeny> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_ACESSDENY,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IAcessDeny> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_ACESSDENY,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
