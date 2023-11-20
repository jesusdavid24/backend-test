import { Request, Response } from 'express';
import errorHandler from '../../utils/errorHandler';
import { getRoles, createRole } from './roles.services';

export async function getAllRolesHandler(_: Request, res: Response) {
  try {
    const roles = await getRoles();
    res.status(200).send(roles);
  } catch (exception: unknown) {
    const message = errorHandler(exception);
    res.status(400).json({ message });
  }
}

export async function createRoleHnadler(req: Request, res: Response) {
  try {
    const data = req.body;
    const role = await createRole(data);
    res.status(200).send(role);
  } catch (exception: unknown) {
    const message = errorHandler(exception);
    res.status(400).json({ message });
  }
}