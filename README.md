# react-native-realm

[![CircleCI](https://circleci.com/gh/jasonmerino/react-native-realm.svg?style=svg)](https://circleci.com/gh/jasonmerino/react-native-realm)

A higher-order component for listening to Realm data in React Native components.

## Usage

```js
// realm.js
import Realm from 'realm';

class Person extends Realm.Object {}
Person.schema = {
  name: 'Person',
  properties: {
    firstName: {
      type: 'string',
    },
    lastName: {
      type: 'string',
    },
  },
};

return new Realm({
  schema: [Person],
});

```

```js
// App.js

import realm from './realm';
import { RealmProvider } from 'react-native-realm';

...
// render function of your top level component for your app
render() {
  <RealmProvider realm={realm}>
    <MyComponent />
  </RealmProvider>
}
...
```

```js
// MyComponent.js

import { connectRealm } from 'react-native-realm';

class MyComponent extends Component {

  addPerson = () => {
    const { realm } = this.props;
    realm.write(() => {
      realm.create('Person', {
        firstName: 'Tim',
      });
    });
  };

  render() {
    <PeopleList people={this.props.people} />
  }
}

export default connectRealm(MyComponent, {
  schemas: ['Person'],
  mapToProps(results, realm, ownProps) {
    // the object that is returned from the mapToProps function
    // will be merged into the components props
    return {
      realm,
      // property on the results argument is the camel-cased and
      // pluralized version of the schema name, so...
      // instead of person being the property we get people
      people: results.people,
    };
  },
});
```

## Examples

Check out the [example react native app](example/README.md) to see react-native-realm in use.
