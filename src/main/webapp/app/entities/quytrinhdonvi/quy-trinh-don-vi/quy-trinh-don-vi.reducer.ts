import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { IQuyTrinhDonVi, defaultValue } from 'app/shared/model/quytrinhdonvi/quy-trinh-don-vi.model';

export const ACTION_TYPES = {
  FETCH_QUYTRINHDONVI_LIST: 'quyTrinhDonVi/FETCH_QUYTRINHDONVI_LIST',
  FETCH_QUYTRINHDONVI: 'quyTrinhDonVi/FETCH_QUYTRINHDONVI',
  CREATE_QUYTRINHDONVI: 'quyTrinhDonVi/CREATE_QUYTRINHDONVI',
  UPDATE_QUYTRINHDONVI: 'quyTrinhDonVi/UPDATE_QUYTRINHDONVI',
  DELETE_QUYTRINHDONVI: 'quyTrinhDonVi/DELETE_QUYTRINHDONVI',
  RESET: 'quyTrinhDonVi/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IQuyTrinhDonVi>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type QuyTrinhDonViState = Readonly<typeof initialState>;

// Reducer

export default (state: QuyTrinhDonViState = initialState, action): QuyTrinhDonViState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_QUYTRINHDONVI_LIST):
    case REQUEST(ACTION_TYPES.FETCH_QUYTRINHDONVI):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_QUYTRINHDONVI):
    case REQUEST(ACTION_TYPES.UPDATE_QUYTRINHDONVI):
    case REQUEST(ACTION_TYPES.DELETE_QUYTRINHDONVI):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_QUYTRINHDONVI_LIST):
    case FAILURE(ACTION_TYPES.FETCH_QUYTRINHDONVI):
    case FAILURE(ACTION_TYPES.CREATE_QUYTRINHDONVI):
    case FAILURE(ACTION_TYPES.UPDATE_QUYTRINHDONVI):
    case FAILURE(ACTION_TYPES.DELETE_QUYTRINHDONVI):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_QUYTRINHDONVI_LIST):
      return {
        ...state,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_QUYTRINHDONVI):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_QUYTRINHDONVI):
    case SUCCESS(ACTION_TYPES.UPDATE_QUYTRINHDONVI):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_QUYTRINHDONVI):
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

const apiUrl = 'quytrinhdonvi/api/quy-trinh-don-vis';

// Actions

export const getEntities: ICrudGetAllAction<IQuyTrinhDonVi> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_QUYTRINHDONVI_LIST,
    payload: axios.get<IQuyTrinhDonVi>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IQuyTrinhDonVi> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_QUYTRINHDONVI,
    payload: axios.get<IQuyTrinhDonVi>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IQuyTrinhDonVi> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_QUYTRINHDONVI,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IQuyTrinhDonVi> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_QUYTRINHDONVI,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IQuyTrinhDonVi> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_QUYTRINHDONVI,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
