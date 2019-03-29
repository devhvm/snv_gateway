import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ITieuChiBaoCao, defaultValue } from 'app/shared/model/donviphathanh/tieu-chi-bao-cao.model';

export const ACTION_TYPES = {
  FETCH_TIEUCHIBAOCAO_LIST: 'tieuChiBaoCao/FETCH_TIEUCHIBAOCAO_LIST',
  FETCH_TIEUCHIBAOCAO: 'tieuChiBaoCao/FETCH_TIEUCHIBAOCAO',
  CREATE_TIEUCHIBAOCAO: 'tieuChiBaoCao/CREATE_TIEUCHIBAOCAO',
  UPDATE_TIEUCHIBAOCAO: 'tieuChiBaoCao/UPDATE_TIEUCHIBAOCAO',
  DELETE_TIEUCHIBAOCAO: 'tieuChiBaoCao/DELETE_TIEUCHIBAOCAO',
  RESET: 'tieuChiBaoCao/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ITieuChiBaoCao>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type TieuChiBaoCaoState = Readonly<typeof initialState>;

// Reducer

export default (state: TieuChiBaoCaoState = initialState, action): TieuChiBaoCaoState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_TIEUCHIBAOCAO_LIST):
    case REQUEST(ACTION_TYPES.FETCH_TIEUCHIBAOCAO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_TIEUCHIBAOCAO):
    case REQUEST(ACTION_TYPES.UPDATE_TIEUCHIBAOCAO):
    case REQUEST(ACTION_TYPES.DELETE_TIEUCHIBAOCAO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_TIEUCHIBAOCAO_LIST):
    case FAILURE(ACTION_TYPES.FETCH_TIEUCHIBAOCAO):
    case FAILURE(ACTION_TYPES.CREATE_TIEUCHIBAOCAO):
    case FAILURE(ACTION_TYPES.UPDATE_TIEUCHIBAOCAO):
    case FAILURE(ACTION_TYPES.DELETE_TIEUCHIBAOCAO):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_TIEUCHIBAOCAO_LIST):
      return {
        ...state,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_TIEUCHIBAOCAO):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_TIEUCHIBAOCAO):
    case SUCCESS(ACTION_TYPES.UPDATE_TIEUCHIBAOCAO):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_TIEUCHIBAOCAO):
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

const apiUrl = 'donviphathanh/api/tieu-chi-bao-caos';

// Actions

export const getEntities: ICrudGetAllAction<ITieuChiBaoCao> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_TIEUCHIBAOCAO_LIST,
    payload: axios.get<ITieuChiBaoCao>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<ITieuChiBaoCao> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_TIEUCHIBAOCAO,
    payload: axios.get<ITieuChiBaoCao>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ITieuChiBaoCao> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_TIEUCHIBAOCAO,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ITieuChiBaoCao> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_TIEUCHIBAOCAO,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ITieuChiBaoCao> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_TIEUCHIBAOCAO,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
