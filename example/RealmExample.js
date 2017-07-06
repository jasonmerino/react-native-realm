import Realm from 'realm';

class Item {}
Item.schema = {
  name: 'Item',
  properties: {
    name:  'string',
    date: 'date',
    id: 'string'
  },
};

export default new Realm({schema: [Item]});