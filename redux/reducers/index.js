import { connectRouter } from 'connected-react-router';
import { combineReducers, createStore } from 'redux';
import { reducer as formReducer } from 'redux-form';
import reducerRegistry from './../reducerRegistry';
import popupReducer from './popup';
import layoutReducer from './layout';

const staticReducers = {
  POPUP: popupReducer,
  LAYOUT: layoutReducer,
};

export default (initialState = {}, enhance, history) => {
  const combine = reducers => {
    const reducerNames = Object.keys(reducers);
    Object.keys(initialState).forEach(item => {
      if (reducerNames.indexOf(item) === -1) {
        reducers[item] = (state = null) => state;
      }
    });
    return combineReducers({
      router: connectRouter(history),
      form: formReducer,
      ...staticReducers,
      ...reducers,
    });
  };

  const reducer = combine(reducerRegistry.getReducers());
  const store = createStore(reducer, initialState, enhance);

  reducerRegistry.setChangeListener(reducers => {
    store.replaceReducer(combine(reducers));
  });

  return store;
};
