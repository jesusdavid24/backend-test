import { PrismaClient } from '@prisma/client';
import { Roles } from './roles.types';

const prisma = new PrismaClient();

export async function getRoles() {
  const roles = await prisma.roles.findMany();
  return roles;
}

export async function createRole(data: Roles) {
  const role = await prisma.roles.create({ data });
  return role;
}
