import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { IChiTieu, defaultValue } from 'app/shared/model/common/chi-tieu.model';

export const ACTION_TYPES = {
  FETCH_CHITIEU_LIST: 'chiTieu/FETCH_CHITIEU_LIST',
  FETCH_CHITIEU: 'chiTieu/FETCH_CHITIEU',
  CREATE_CHITIEU: 'chiTieu/CREATE_CHITIEU',
  UPDATE_CHITIEU: 'chiTieu/UPDATE_CHITIEU',
  DELETE_CHITIEU: 'chiTieu/DELETE_CHITIEU',
  RESET: 'chiTieu/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IChiTieu>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type ChiTieuState = Readonly<typeof initialState>;

// Reducer

export default (state: ChiTieuState = initialState, action): ChiTieuState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_CHITIEU_LIST):
    case REQUEST(ACTION_TYPES.FETCH_CHITIEU):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_CHITIEU):
    case REQUEST(ACTION_TYPES.UPDATE_CHITIEU):
    case REQUEST(ACTION_TYPES.DELETE_CHITIEU):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_CHITIEU_LIST):
    case FAILURE(ACTION_TYPES.FETCH_CHITIEU):
    case FAILURE(ACTION_TYPES.CREATE_CHITIEU):
    case FAILURE(ACTION_TYPES.UPDATE_CHITIEU):
    case FAILURE(ACTION_TYPES.DELETE_CHITIEU):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_CHITIEU_LIST):
      return {
        ...state,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_CHITIEU):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_CHITIEU):
    case SUCCESS(ACTION_TYPES.UPDATE_CHITIEU):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_CHITIEU):
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

const apiUrl = 'common/api/chi-tieus';

// Actions

export const getEntities: ICrudGetAllAction<IChiTieu> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_CHITIEU_LIST,
    payload: axios.get<IChiTieu>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IChiTieu> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_CHITIEU,
    payload: axios.get<IChiTieu>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IChiTieu> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_CHITIEU,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IChiTieu> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_CHITIEU,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IChiTieu> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_CHITIEU,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
