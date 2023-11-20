import { Roles as RolesModel } from '@prisma/client';

export type Roles = RolesModel;

export type RolesSeeder = Omit<Roles, 'Users'>;
