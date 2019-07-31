import { routerMiddleware } from 'connected-react-router';
import { applyMiddleware, compose } from 'redux';
import freeze from 'redux-freeze';
import createStore from './reducers';
import thunk from 'redux-thunk';

class ReduxStore {
  constructor() {
    if (ReduxStore.instance) {
      return ReduxStore.instance;
    }

    // SINGLETON
    ReduxStore.instance = this;
  }

  init = (initialState, history) => {
    this.initialState = initialState;
    this.history = history;

    this.store = this._configureStore(this.initialState, this.history);

    return this.store;
  };

  _configureStore = (initialState = {}, history) => {
    const middlewares = [thunk, routerMiddleware(history)];

    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
      middlewares.push(freeze);
    }

    const enhancers = [applyMiddleware(...middlewares)];
    return createStore(
      initialState,
      this._composeEnhancers(...enhancers),
      history
    );
  };

  _composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
          shouldHotReload: false,
        })
      : compose;

  getStore = () => this.store;
}

const ReduxStoreInstance = new ReduxStore();

export default ReduxStoreInstance;
