import { Response, NextFunction } from 'express';

import { getUserByEmail } from '../api/user/user.service';
import { AuthRequest } from './auth.types';
import { User } from '../api/user/user.types';
import { verifyToken, getRoleById } from './auth.service';

export const isAuthenticated = async (
  req: AuthRequest, 
  res: Response, 
  next: NextFunction
) => {

  const token = req.headers?.authorization?.split(' ')[1];
  
  if(!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const decoded = verifyToken(token)

  if(!decoded){
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const user = await getUserByEmail(decoded.email) as User

  req.user = user

  return next();
}

export function hasRole(rolesAllowed: string[]) {
  return async (req: AuthRequest, res: Response, next: NextFunction) => {
    const { rolesId } = req.user as User;
    const role = await getRoleById(rolesId);
    const hasPermission = rolesAllowed.includes(role?.name as string);

    if (!hasPermission) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    return next();
  };
}