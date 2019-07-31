import React from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import reducerRegistry from 'sdk-redux/reducerRegistry';

export default (arrayOfKeyReducer = []) => WrappedComponent => {
  class withReducers extends React.Component {
    componentWillMount() {
      arrayOfKeyReducer.map(item => {
        const { key, reducer } = item;
        reducerRegistry.register(key, reducer);
      });
    }
    render() {
      return <WrappedComponent {...this.props} />;
    }
  }
  return hoistNonReactStatics(withReducers, WrappedComponent);
};
