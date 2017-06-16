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
import { connectRealm } from 'react-native-realm';

const styles = StyleSheet.create({
  screen: {
    paddingTop: 20,
    paddingHorizontal: 10,
    backgroundColor: '#2a2a2a',
    flex: 1,
  },
  item: {
    height: 44,
    justifyContent: 'center',
    paddingHorizontal: 10,
    marginTop: 10,
    backgroundColor: 'cyan',
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
      });
      this.count++;
    });
  };

  onPressRemoveItem = (item) => {
    const { realm } = this.props;
    realm.write(() => {
      realm.delete(item);
    });
  };

  render() {
    return (
      <View style={styles.screen}>
        <TouchableOpacity onPress={this.onPressAddItem} style={styles.add}>
          <Text style={styles.addText}>Add Item</Text>
        </TouchableOpacity>
        <ScrollView>
          {this.props.items.map((item, index) => {
            return (
              <TouchableOpacity key={index} onPress={() => this.onPressRemoveItem(item)} style={styles.item}>
                <Text>{item.name}</Text>
              </TouchableOpacity>
            )
          })}
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