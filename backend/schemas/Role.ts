import { relationship, text } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';
import { permissionFields } from './fields';

export const Role = list({
  fields: {
    name: text({ isRequired: true }),
    ...permissionFields,
    assignedTo: relationship({
      ref: 'User.role', // this is the name of the field in the User schema
      many: true,
      ui: {
        itemView: { fieldMode: 'read' },
      },
    }),
  },
});
