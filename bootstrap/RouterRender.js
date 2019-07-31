import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';

class RouterRender extends Component {
  _renderRoute(routeProps, route, index) {
    const { match } = routeProps;

    if (match) {
      if (typeof this.props.renderCallback === 'function') {
        return this.props.renderCallback(routeProps, route, index);
      }

      return React.createElement(route.component);
    }
  }

  render() {
    return (
      <Switch>
        {[...this.props.routes].map((route, index) => (
          <Route key={index}
            path={route.path}
            exact={route.exact}>
            {routeProps => this._renderRoute(routeProps, route, index)}
          </Route>
        ))}
      </Switch>
    );
  }
}

RouterRender.propTypes = {
  routes: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string,
      exact: PropTypes.bool,
      component: PropTypes.func,
    })
  ),
  renderCallback: PropTypes.func,
};

export default RouterRender;
