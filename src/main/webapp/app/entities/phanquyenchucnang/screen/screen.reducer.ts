import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { IScreen, defaultValue } from 'app/shared/model/phanquyenchucnang/screen.model';

export const ACTION_TYPES = {
  FETCH_SCREEN_LIST: 'screen/FETCH_SCREEN_LIST',
  FETCH_SCREEN: 'screen/FETCH_SCREEN',
  CREATE_SCREEN: 'screen/CREATE_SCREEN',
  UPDATE_SCREEN: 'screen/UPDATE_SCREEN',
  DELETE_SCREEN: 'screen/DELETE_SCREEN',
  RESET: 'screen/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IScreen>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type ScreenState = Readonly<typeof initialState>;

// Reducer

export default (state: ScreenState = initialState, action): ScreenState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_SCREEN_LIST):
    case REQUEST(ACTION_TYPES.FETCH_SCREEN):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_SCREEN):
    case REQUEST(ACTION_TYPES.UPDATE_SCREEN):
    case REQUEST(ACTION_TYPES.DELETE_SCREEN):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_SCREEN_LIST):
    case FAILURE(ACTION_TYPES.FETCH_SCREEN):
    case FAILURE(ACTION_TYPES.CREATE_SCREEN):
    case FAILURE(ACTION_TYPES.UPDATE_SCREEN):
    case FAILURE(ACTION_TYPES.DELETE_SCREEN):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_SCREEN_LIST):
      return {
        ...state,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_SCREEN):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_SCREEN):
    case SUCCESS(ACTION_TYPES.UPDATE_SCREEN):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_SCREEN):
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

const apiUrl = 'phanquyenchucnang/api/screens';

// Actions

export const getEntities: ICrudGetAllAction<IScreen> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_SCREEN_LIST,
    payload: axios.get<IScreen>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IScreen> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_SCREEN,
    payload: axios.get<IScreen>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IScreen> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_SCREEN,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IScreen> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_SCREEN,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IScreen> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_SCREEN,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
