/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Text,
  ScrollView,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import uuid from 'uuid';
import { connectRealm } from 'react-native-realm';
import ConnectedExampleItem from './ConnectedExampleItem';

const styles = StyleSheet.create({
  screen: {
    paddingTop: 20,
    paddingHorizontal: 10,
    backgroundColor: '#2a2a2a',
    flex: 1,
  },
  add: {
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    backgroundColor: '#1a1a1a',
  },
  addText: {
    color: 'white',
  },
});

class ConnectedExample extends Component {

  count = 0;

  onPressAddItem = () => {
    const { realm } = this.props;
    realm.write(() => {
      realm.create('Item', {
        name: this.count.toString(),
        date: new Date(),
        id: uuid.v4(),
      });
      this.count++;
    });
  };

  render() {
    return (
      <View style={styles.screen}>
        <TouchableOpacity onPress={this.onPressAddItem} style={styles.add}>
          <Text style={styles.addText}>Add Item</Text>
        </TouchableOpacity>
        <ScrollView>
          {this.props.items.map((item) => (
            <View key={item.id}>
              <ConnectedExampleItem id={item.id} />
            </View>
          ))}
        </ScrollView>
      </View>
    );
  }
}

export default connectRealm(ConnectedExample, {
  schemas: ['Item'],
  mapToProps(results, realm) {
    return {
      realm,
      items: results.items.sorted('date') || [],
    };
  },
});