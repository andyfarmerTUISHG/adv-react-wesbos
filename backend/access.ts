// At it's simplest, the access control returns a yes or no value depending on the users session:

import { permissionsList } from './schemas/fields';
import { ListAccessArgs } from './types';

export function isSignedIn({ session }: ListAccessArgs) {
  // if session is not defined, return false
  return !!session; // !! uses coercion to turn the session into a boolean
}

const generatedPermissions = Object.fromEntries(
  permissionsList.map((permission) => [
    permission,
    function ({ session }: ListAccessArgs) {
      return !!session?.data.role?.[permission];
    },
  ])
);

// Permissions check if someone meets a criteria - yes or no.
// Spread the generatedPermissions into the permissions object
// Add a custom role to the permissions object
export const permissions = {
  ...generatedPermissions,
  isAwesome({ session }: ListAccessArgs): boolean {
    return session?.data.name.includes('andy');
  },
};

// TODO: Rule based functions
