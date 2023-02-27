import { integer, relationship, text, virtual } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';
import formatMoney from '../lib/formatMoney';

export const Order = list({
  // TODO
  fields: {
    label: virtual({
      graphqlReturnType: 'String',
      resolver(item) {
        return `trying this out - ${formatMoney(item.total)}`;
      },
    }),
    total: integer(),
    items: relationship({
      ref: 'OrderItem.order',
      many: true,
    }),
    user: relationship({
      ref: 'User.orders',
    }),
    charge: text(),
  },
  ui: {
    listView: {
      initialColumns: ['user', 'charge', 'items', 'total'],
    },
  },
});
