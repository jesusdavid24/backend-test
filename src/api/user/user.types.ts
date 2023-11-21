import { User as UserModel } from '@prisma/client';

export type User = UserModel;

export type RequestUserData = Pick<UserModel, 'firstName' | 'lastName' | 'email' | 'password'> & { rolesId: string };

export type UserCredential = Omit<RequestUserData, 'roleId'>;