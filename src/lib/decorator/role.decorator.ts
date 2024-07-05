import { SetMetadata } from '@nestjs/common';

import { Role } from '@lib/enums';

export const ROLES_KEY = 'hasRoles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
