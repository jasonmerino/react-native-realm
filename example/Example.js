/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
} from 'react-native';
import { RealmProvider } from 'react-native-realm';
import ConnectedExample from './ConnectedExample';
import realm from './RealmExample';

class Example extends Component {
  render() {
    return (
      <RealmProvider realm={realm}>
        <ConnectedExample />
      </RealmProvider>
    );
  }
}

AppRegistry.registerComponent('example', () => Example);

export default Example;