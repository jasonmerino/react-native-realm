# realm-react

A higher-order component for listening to Realm data in React components.

## Usage

```js
// the file you use to wire up your realm schemas, etc.
import realm from './your/realm/file';

...
// render function of your top level component for your app
render() {
  <RealmProvider realm={realm}>
    <App />
  </RealmProvider>
}
...
```

```js
import { connectRealm } from 'realm-react';

class MyComponent extends Component {
  // data from given realm schema shows up under this.props.realm[schema name]
  // property is camelcased and pluralized
  render() {
    <PeopleList people={this.props.realm.people} />
  }
}

export default connectRealm(MyComponent, {
  schemas: ['Person']
})
```
