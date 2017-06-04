import PropTypes from 'prop-types';
import { Component } from 'react';

export default class RealmProvider extends Component {
  static childContextTypes = {
    reactRealmInstance: PropTypes.object,
  };
  getChildContext() {
    return {
      reactRealmInstance: this.props.realm,
    };
  }
  render() {
    return this.props.children;
  }
}
