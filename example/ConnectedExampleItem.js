import React, {
  Component,
  PropTypes,
} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import { connectRealm } from 'react-native-realm';

const styles = StyleSheet.create({
  item: {
    height: 44,
    justifyContent: 'center',
    paddingHorizontal: 10,
    marginTop: 10,
    backgroundColor: 'cyan',
  },
});

class ConnectedExampleItem extends Component {

  onPressRemoveItem = (item) => {
    const { realm } = this.props;
    realm.write(() => {
      realm.delete(item);
    });
  };

  render() {
    return (
      <TouchableOpacity
        onPress={() => this.onPressRemoveItem(this.props.item)}
        style={styles.item}
      >
        <Text>{this.props.item.name}</Text>
      </TouchableOpacity>
    );
  }

}

export default connectRealm(ConnectedExampleItem, {
  schemas: ['Item'],
  mapToProps(results, realm, ownProps) {
    return {
      realm,
      item: results.items.find(item => item.id === ownProps.id),
    };
  },
});

