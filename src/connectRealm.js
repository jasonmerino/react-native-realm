import PropTypes from 'prop-types';
import React from 'react';
import pluralize from 'pluralize';
import camelcase from 'camelcase';
import hoistNonReactStatic from 'hoist-non-react-statics';

function getResultsName(schema) {
  return pluralize(camelcase(schema), 2);
}

// This function takes a component...
function connectRealm(WrappedComponent, options) {
  class ConnectedRealmComponent extends React.Component {
    static contextTypes = {
      reactRealmInstance: PropTypes.object,
    };

    constructor(props, context) {
      super(props);

      this.schemaList = options.schemas || [];
      this.results = {};

      this.updateView = this.updateView.bind(this);

      this.schemaList.forEach(schema => {
        this.results[
          getResultsName(schema)
        ] = context.reactRealmInstance.objects(schema);
        this.results[getResultsName(schema)].addListener(this.updateView);
      });
    }

    componentWillUnmount() {
      this.schemaList.forEach(schema => {
        this.results[getResultsName(schema)].removeListener(this.updateView);
      });
    }

    updateView() {
      this.forceUpdate();
    }

    render() {
      // ... and renders the wrapped component with the fresh data!
      // Notice that we pass through any additional props
      return <WrappedComponent realm={this.results} {...this.props} />;
    }
  }

  hoistNonReactStatic(ConnectedRealmComponent, WrappedComponent);

  return ConnectedRealmComponent;
}

export default connectRealm;
