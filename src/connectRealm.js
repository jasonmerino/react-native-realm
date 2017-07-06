import PropTypes from 'prop-types';
import React from 'react';
import pluralize from 'pluralize';
import camelcase from 'camelcase';
import hoistNonReactStatic from 'hoist-non-react-statics';

export function getResultsName(schema) {
  return pluralize(camelcase(schema), 2);
}

function connectRealm(WrappedComponent, options) {
  class ConnectedRealmComponent extends React.Component {
    static contextTypes = {
      reactRealmInstance: PropTypes.object,
    };

    constructor(props, context) {
      super(props, context);

      this.schemaList = options.schemas || [];
      this.results = {};

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

    getProps = () => {
      if (options && typeof options.mapToProps === 'function') {
        return options.mapToProps(
          this.results,
          this.context.reactRealmInstance,
          this.props,
        );
      }
      return {};
    };

    updateView = () => {
      this.forceUpdate();
    };

    render() {
      return <WrappedComponent {...this.getProps()} {...this.props} />;
    }
  }

  hoistNonReactStatic(ConnectedRealmComponent, WrappedComponent);

  return ConnectedRealmComponent;
}

export default connectRealm;
