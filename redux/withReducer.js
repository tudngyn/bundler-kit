import hoistNonReactStatics from 'hoist-non-react-statics';
import React from 'react';
import reducerRegistry from 'sdk-redux/reducerRegistry';
import withReducers from './withReducers';

/**
 * React 16.6.0: contextType
 */
export default (key, reducer) => WrappedComponent => {
  class withReducer extends React.Component {
    componentWillMount() {
      reducerRegistry.register(key, reducer);
    }
    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  return hoistNonReactStatics(withReducer, WrappedComponent);
};

// This is for backward compatibility
// Real withReducers was moved to withReducers.js
export const injectReducers = withReducers;
