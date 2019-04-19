import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { ICoQuanHanhChinh, defaultValue } from 'app/shared/model/quytrinhdonvi/co-quan-hanh-chinh.model';

export const ACTION_TYPES = {
  FETCH_COQUANHANHCHINH_LIST: 'coQuanHanhChinh/FETCH_COQUANHANHCHINH_LIST',
  FETCH_COQUANHANHCHINH: 'coQuanHanhChinh/FETCH_COQUANHANHCHINH',
  CREATE_COQUANHANHCHINH: 'coQuanHanhChinh/CREATE_COQUANHANHCHINH',
  UPDATE_COQUANHANHCHINH: 'coQuanHanhChinh/UPDATE_COQUANHANHCHINH',
  DELETE_COQUANHANHCHINH: 'coQuanHanhChinh/DELETE_COQUANHANHCHINH',
  RESET: 'coQuanHanhChinh/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ICoQuanHanhChinh>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type CoQuanHanhChinhState = Readonly<typeof initialState>;

// Reducer

export default (state: CoQuanHanhChinhState = initialState, action): CoQuanHanhChinhState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_COQUANHANHCHINH_LIST):
    case REQUEST(ACTION_TYPES.FETCH_COQUANHANHCHINH):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_COQUANHANHCHINH):
    case REQUEST(ACTION_TYPES.UPDATE_COQUANHANHCHINH):
    case REQUEST(ACTION_TYPES.DELETE_COQUANHANHCHINH):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_COQUANHANHCHINH_LIST):
    case FAILURE(ACTION_TYPES.FETCH_COQUANHANHCHINH):
    case FAILURE(ACTION_TYPES.CREATE_COQUANHANHCHINH):
    case FAILURE(ACTION_TYPES.UPDATE_COQUANHANHCHINH):
    case FAILURE(ACTION_TYPES.DELETE_COQUANHANHCHINH):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_COQUANHANHCHINH_LIST):
      return {
        ...state,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_COQUANHANHCHINH):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_COQUANHANHCHINH):
    case SUCCESS(ACTION_TYPES.UPDATE_COQUANHANHCHINH):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_COQUANHANHCHINH):
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

const apiUrl = 'quytrinhdonvi/api/co-quan-hanh-chinhs';

// Actions

export const getEntities: ICrudGetAllAction<ICoQuanHanhChinh> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_COQUANHANHCHINH_LIST,
    payload: axios.get<ICoQuanHanhChinh>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<ICoQuanHanhChinh> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_COQUANHANHCHINH,
    payload: axios.get<ICoQuanHanhChinh>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ICoQuanHanhChinh> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_COQUANHANHCHINH,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ICoQuanHanhChinh> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_COQUANHANHCHINH,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ICoQuanHanhChinh> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_COQUANHANHCHINH,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
