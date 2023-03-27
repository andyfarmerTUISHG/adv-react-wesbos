import { relationship, text } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';
import { permissions } from '../access';
import { permissionFields } from './fields';

export const Role = list({
  access: {
    create: permissions.canManageRoles,
    read: permissions.canManageRoles,
    update: permissions.canManageRoles,
    create: permissions.canManageRoles,
  },
  // Prevents the display of things they cant do
  ui: {
    hideCreate: (args) => !permissions.canManageRoles(args),
    hideDelete: (args) => !permissions.canManageRoles(args),
    isHidden: (args) => !permissions.canManageRoles(args),
  },
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
