import PropTypes from 'prop-types';
import React from 'react';
import pluralize from 'pluralize';
import camelcase from 'camelcase';
import hoistNonReactStatic from 'hoist-non-react-statics';

function getResultsName(schema) {
  return pluralize(camelcase(schema), 2);
}

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

    getProps = () => {
      if (options && options.mapToProps) {
        return options.mapToProps(this.results, this.context.reactRealmInstance);
      }
      return {};
    };

    updateView = () => {
      this.forceUpdate();
    };

    render() {
      return (
        <WrappedComponent
          {...this.getProps()}
          {...this.props}
        />
      );
    }
  }

  hoistNonReactStatic(ConnectedRealmComponent, WrappedComponent);

  return ConnectedRealmComponent;
}

export default connectRealm;
