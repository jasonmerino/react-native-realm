import Realm from 'realm';

class Item {}
Item.schema = {
  name: 'Item',
  properties: {
    name:  'string',
    date: 'date',
  },
};

export default new Realm({schema: [Item]});