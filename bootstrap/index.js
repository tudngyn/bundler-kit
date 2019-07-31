import { ConnectedRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import PropTypes from 'prop-types';
import React from 'react';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import { ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ModalKit from 'sdk-components/ModalKit';
import LoadingBackdrop from '../components/LoadingBackdrop';
import ReduxStoreInstance from 'sdk-redux';
import './style.scss';

function bootstrap({
  routes,
  basename = '/',
  RouteWrapComponent = React.Fragment,
  children,
}) {
  const initialState = {};
  const history = createBrowserHistory({
    basename,
  });

  const store = ReduxStoreInstance.init(initialState, history);

  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <RouteWrapComponent>
          <React.Fragment>
            <ToastContainer
              transition={Zoom}
              autoClose={6000}
              draggable={false}
              hideProgressBar
            />
            <ModalKit />
            <LoadingBackdrop />
            {children}
            {renderRoutes(routes)}
          </React.Fragment>
        </RouteWrapComponent>
      </ConnectedRouter>
    </Provider>
  );
}

bootstrap.propTypes = {
  /*
    RouteWrapComponent: you can pass BrowserRouter, MemoryRouter
    Checkout ReactTraining Router v4 for more
  */
  RouteWrapComponent: PropTypes.func,
  routes: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string,
      component: PropTypes.oneOfType([
        PropTypes.shape({}),
        PropTypes.func,
        PropTypes.element,
      ]),
      exact: PropTypes.bool,
    })
  ),
  basename: PropTypes.string,
  children: PropTypes.shape({}),
};

export default bootstrap;
