import axios from 'axios';

import configureStore from 'redux-mock-store';
import promiseMiddleware from 'redux-promise-middleware';
import thunk from 'redux-thunk';
import sinon from 'sinon';

import reducer, {
  ACTION_TYPES,
  createEntity,
  deleteEntity,
  getEntities,
  getEntity,
  updateEntity,
  reset
} from 'app/entities/quytrinhdonvi/uy-quyen-tien-trinh/uy-quyen-tien-trinh.reducer';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { IUyQuyenTienTrinh, defaultValue } from 'app/shared/model/quytrinhdonvi/uy-quyen-tien-trinh.model';

// tslint:disable no-invalid-template-strings
describe('Entities reducer tests', () => {
  function isEmpty(element): boolean {
    if (element instanceof Array) {
      return element.length === 0;
    } else {
      return Object.keys(element).length === 0;
    }
  }

  const initialState = {
    loading: false,
    errorMessage: null,
    entities: [] as ReadonlyArray<IUyQuyenTienTrinh>,
    entity: defaultValue,
    totalItems: 0,
    updating: false,
    updateSuccess: false
  };

  function testInitialState(state) {
    expect(state).toMatchObject({
      loading: false,
      errorMessage: null,
      updating: false,
      updateSuccess: false
    });
    expect(isEmpty(state.entities));
    expect(isEmpty(state.entity));
  }

  function testMultipleTypes(types, payload, testFunction) {
    types.forEach(e => {
      testFunction(reducer(undefined, { type: e, payload }));
    });
  }

  describe('Common', () => {
    it('should return the initial state', () => {
      testInitialState(reducer(undefined, {}));
    });
  });

  describe('Requests', () => {
    it('should set state to loading', () => {
      testMultipleTypes([REQUEST(ACTION_TYPES.FETCH_UYQUYENTIENTRINH_LIST), REQUEST(ACTION_TYPES.FETCH_UYQUYENTIENTRINH)], {}, state => {
        expect(state).toMatchObject({
          errorMessage: null,
          updateSuccess: false,
          loading: true
        });
      });
    });

    it('should set state to updating', () => {
      testMultipleTypes(
        [
          REQUEST(ACTION_TYPES.CREATE_UYQUYENTIENTRINH),
          REQUEST(ACTION_TYPES.UPDATE_UYQUYENTIENTRINH),
          REQUEST(ACTION_TYPES.DELETE_UYQUYENTIENTRINH)
        ],
        {},
        state => {
          expect(state).toMatchObject({
            errorMessage: null,
            updateSuccess: false,
            updating: true
          });
        }
      );
    });

    it('should reset the state', () => {
      expect(
        reducer(
          { ...initialState, loading: true },
          {
            type: ACTION_TYPES.RESET
          }
        )
      ).toEqual({
        ...initialState
      });
    });
  });

  describe('Failures', () => {
    it('should set a message in errorMessage', () => {
      testMultipleTypes(
        [
          FAILURE(ACTION_TYPES.FETCH_UYQUYENTIENTRINH_LIST),
          FAILURE(ACTION_TYPES.FETCH_UYQUYENTIENTRINH),
          FAILURE(ACTION_TYPES.CREATE_UYQUYENTIENTRINH),
          FAILURE(ACTION_TYPES.UPDATE_UYQUYENTIENTRINH),
          FAILURE(ACTION_TYPES.DELETE_UYQUYENTIENTRINH)
        ],
        'error message',
        state => {
          expect(state).toMatchObject({
            errorMessage: 'error message',
            updateSuccess: false,
            updating: false
          });
        }
      );
    });
  });

  describe('Successes', () => {
    it('should fetch all entities', () => {
      const payload = { data: [{ 1: 'fake1' }, { 2: 'fake2' }], headers: { 'x-total-count': 123 } };
      expect(
        reducer(undefined, {
          type: SUCCESS(ACTION_TYPES.FETCH_UYQUYENTIENTRINH_LIST),
          payload
        })
      ).toEqual({
        ...initialState,
        loading: false,
        totalItems: payload.headers['x-total-count'],
        entities: payload.data
      });
    });

    it('should fetch a single entity', () => {
      const payload = { data: { 1: 'fake1' } };
      expect(
        reducer(undefined, {
          type: SUCCESS(ACTION_TYPES.FETCH_UYQUYENTIENTRINH),
          payload
        })
      ).toEqual({
        ...initialState,
        loading: false,
        entity: payload.data
      });
    });

    it('should create/update entity', () => {
      const payload = { data: 'fake payload' };
      expect(
        reducer(undefined, {
          type: SUCCESS(ACTION_TYPES.CREATE_UYQUYENTIENTRINH),
          payload
        })
      ).toEqual({
        ...initialState,
        updating: false,
        updateSuccess: true,
        entity: payload.data
      });
    });

    it('should delete entity', () => {
      const payload = 'fake payload';
      const toTest = reducer(undefined, {
        type: SUCCESS(ACTION_TYPES.DELETE_UYQUYENTIENTRINH),
        payload
      });
      expect(toTest).toMatchObject({
        updating: false,
        updateSuccess: true
      });
    });
  });

  describe('Actions', () => {
    let store;

    const resolvedObject = { value: 'whatever' };
    beforeEach(() => {
      const mockStore = configureStore([thunk, promiseMiddleware()]);
      store = mockStore({});
      axios.get = sinon.stub().returns(Promise.resolve(resolvedObject));
      axios.post = sinon.stub().returns(Promise.resolve(resolvedObject));
      axios.put = sinon.stub().returns(Promise.resolve(resolvedObject));
      axios.delete = sinon.stub().returns(Promise.resolve(resolvedObject));
    });

    it('dispatches ACTION_TYPES.FETCH_UYQUYENTIENTRINH_LIST actions', async () => {
      const expectedActions = [
        {
          type: REQUEST(ACTION_TYPES.FETCH_UYQUYENTIENTRINH_LIST)
        },
        {
          type: SUCCESS(ACTION_TYPES.FETCH_UYQUYENTIENTRINH_LIST),
          payload: resolvedObject
        }
      ];
      await store.dispatch(getEntities()).then(() => expect(store.getActions()).toEqual(expectedActions));
    });

    it('dispatches ACTION_TYPES.FETCH_UYQUYENTIENTRINH actions', async () => {
      const expectedActions = [
        {
          type: REQUEST(ACTION_TYPES.FETCH_UYQUYENTIENTRINH)
        },
        {
          type: SUCCESS(ACTION_TYPES.FETCH_UYQUYENTIENTRINH),
          payload: resolvedObject
        }
      ];
      await store.dispatch(getEntity(42666)).then(() => expect(store.getActions()).toEqual(expectedActions));
    });

    it('dispatches ACTION_TYPES.CREATE_UYQUYENTIENTRINH actions', async () => {
      const expectedActions = [
        {
          type: REQUEST(ACTION_TYPES.CREATE_UYQUYENTIENTRINH)
        },
        {
          type: SUCCESS(ACTION_TYPES.CREATE_UYQUYENTIENTRINH),
          payload: resolvedObject
        },
        {
          type: REQUEST(ACTION_TYPES.FETCH_UYQUYENTIENTRINH_LIST)
        },
        {
          type: SUCCESS(ACTION_TYPES.FETCH_UYQUYENTIENTRINH_LIST),
          payload: resolvedObject
        }
      ];
      await store.dispatch(createEntity({ id: 1 })).then(() => expect(store.getActions()).toEqual(expectedActions));
    });

    it('dispatches ACTION_TYPES.UPDATE_UYQUYENTIENTRINH actions', async () => {
      const expectedActions = [
        {
          type: REQUEST(ACTION_TYPES.UPDATE_UYQUYENTIENTRINH)
        },
        {
          type: SUCCESS(ACTION_TYPES.UPDATE_UYQUYENTIENTRINH),
          payload: resolvedObject
        },
        {
          type: REQUEST(ACTION_TYPES.FETCH_UYQUYENTIENTRINH_LIST)
        },
        {
          type: SUCCESS(ACTION_TYPES.FETCH_UYQUYENTIENTRINH_LIST),
          payload: resolvedObject
        }
      ];
      await store.dispatch(updateEntity({ id: 1 })).then(() => expect(store.getActions()).toEqual(expectedActions));
    });

    it('dispatches ACTION_TYPES.DELETE_UYQUYENTIENTRINH actions', async () => {
      const expectedActions = [
        {
          type: REQUEST(ACTION_TYPES.DELETE_UYQUYENTIENTRINH)
        },
        {
          type: SUCCESS(ACTION_TYPES.DELETE_UYQUYENTIENTRINH),
          payload: resolvedObject
        },
        {
          type: REQUEST(ACTION_TYPES.FETCH_UYQUYENTIENTRINH_LIST)
        },
        {
          type: SUCCESS(ACTION_TYPES.FETCH_UYQUYENTIENTRINH_LIST),
          payload: resolvedObject
        }
      ];
      await store.dispatch(deleteEntity(42666)).then(() => expect(store.getActions()).toEqual(expectedActions));
    });

    it('dispatches ACTION_TYPES.RESET actions', async () => {
      const expectedActions = [
        {
          type: ACTION_TYPES.RESET
        }
      ];
      await store.dispatch(reset());
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
