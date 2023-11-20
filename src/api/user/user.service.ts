import { PrismaClient } from '@prisma/client';

import { hashPassword, createHashToken } from '../../auth/utils/bcrypt';
import { User } from './user.types';

const prisma = new PrismaClient();

export async function getAllUser() {
  const users = await prisma.user.findMany({
    select: {
      id: false,
      firstName: true,
      lastName: true,
      email: true,
      roles:{
        select: {
          Role: {
            select: {
              id: true,
              name: true,
            }
          }
        }
      }
    }
  });
  return users;
}

export async function createUser(input: any) {

  const hashedPassword = await hashPassword(input.password);
  const expiresIn = Date.now() + 1000 * 60 * 60 * 24 // 24 horas

  const data = {
    ...input,
    password: hashedPassword,
    resetToken: createHashToken(input.email),
    tokenExpires: new Date(expiresIn)
  }

  const user = await prisma.user.create({
    data
  });

  return user;
}

export async function getUserById(id: string) {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  return user;
}

export async function getUserByEmail(email: string) {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
    include: {
      roles: {
        select: {
          Role: {
            select: {
              id: true,
              name: true
            }
          }
        }
      }
    }
  });

  return user;
}

export async function deleteUser(id: string) {
  const user = await prisma.user.delete({
    where: {
      id,
    },
  });

  return user;
}

export async function updateUser(id: string, data: User) {
  const user = await prisma.user.update({
    where: {
      id: id,
    },
    data: {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
    },
  });

  return user;
}
