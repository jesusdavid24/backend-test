import jwt from 'jsonwebtoken';

import { PayloadType } from './auth.types';
import { PrismaClient } from '@prisma/client';

const SECRET = process.env.JWT_SECRET as string

export const verifyToken = (token: string) => {
  const decoded = jwt.verify(token, SECRET) as PayloadType

  return decoded
};

export const signToken = (payload: PayloadType) => {
  const token = jwt.sign(payload, SECRET, { expiresIn: `${1000 * 60 * 60 * 24}` })

  return token
};

const prisma = new PrismaClient();


export async function getRoleById(id: string) {
  const role = await prisma.roles.findUnique({
    where: {
      id,
    },
  });
  return role;
};