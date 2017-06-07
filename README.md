# realm-react

A higher-order component for listening to Realm data in React components.

## Usage

```js
// the file you use to wire up your realm schemas, etc.
import realm from './path/to/your/realm/file';

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
import { connectRealm } from 'realm-react';

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
  mapToProps(results, realm) {
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
