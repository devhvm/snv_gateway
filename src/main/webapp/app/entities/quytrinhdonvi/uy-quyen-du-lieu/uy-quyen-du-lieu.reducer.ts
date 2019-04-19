import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { IUyQuyenDuLieu, defaultValue } from 'app/shared/model/quytrinhdonvi/uy-quyen-du-lieu.model';

export const ACTION_TYPES = {
  FETCH_UYQUYENDULIEU_LIST: 'uyQuyenDuLieu/FETCH_UYQUYENDULIEU_LIST',
  FETCH_UYQUYENDULIEU: 'uyQuyenDuLieu/FETCH_UYQUYENDULIEU',
  CREATE_UYQUYENDULIEU: 'uyQuyenDuLieu/CREATE_UYQUYENDULIEU',
  UPDATE_UYQUYENDULIEU: 'uyQuyenDuLieu/UPDATE_UYQUYENDULIEU',
  DELETE_UYQUYENDULIEU: 'uyQuyenDuLieu/DELETE_UYQUYENDULIEU',
  RESET: 'uyQuyenDuLieu/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IUyQuyenDuLieu>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type UyQuyenDuLieuState = Readonly<typeof initialState>;

// Reducer

export default (state: UyQuyenDuLieuState = initialState, action): UyQuyenDuLieuState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_UYQUYENDULIEU_LIST):
    case REQUEST(ACTION_TYPES.FETCH_UYQUYENDULIEU):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_UYQUYENDULIEU):
    case REQUEST(ACTION_TYPES.UPDATE_UYQUYENDULIEU):
    case REQUEST(ACTION_TYPES.DELETE_UYQUYENDULIEU):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_UYQUYENDULIEU_LIST):
    case FAILURE(ACTION_TYPES.FETCH_UYQUYENDULIEU):
    case FAILURE(ACTION_TYPES.CREATE_UYQUYENDULIEU):
    case FAILURE(ACTION_TYPES.UPDATE_UYQUYENDULIEU):
    case FAILURE(ACTION_TYPES.DELETE_UYQUYENDULIEU):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_UYQUYENDULIEU_LIST):
      return {
        ...state,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_UYQUYENDULIEU):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_UYQUYENDULIEU):
    case SUCCESS(ACTION_TYPES.UPDATE_UYQUYENDULIEU):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_UYQUYENDULIEU):
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

const apiUrl = 'quytrinhdonvi/api/uy-quyen-du-lieus';

// Actions

export const getEntities: ICrudGetAllAction<IUyQuyenDuLieu> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_UYQUYENDULIEU_LIST,
    payload: axios.get<IUyQuyenDuLieu>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IUyQuyenDuLieu> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_UYQUYENDULIEU,
    payload: axios.get<IUyQuyenDuLieu>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IUyQuyenDuLieu> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_UYQUYENDULIEU,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IUyQuyenDuLieu> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_UYQUYENDULIEU,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IUyQuyenDuLieu> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_UYQUYENDULIEU,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
