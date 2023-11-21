import { Request, Response } from 'express';

import {
  createUser,
  deleteUser,
  getAllUser,
  getUserById,
  updateUser,
} from './user.service';
import { AuthRequest } from '../../auth/auth.types';
import { User, RequestUserData, UserCredential } from './user.types';
import { sendNodeMailer } from '../../config/nodemailer';
import { welcomeEmail } from '../../utils/emails';
import errorHandler from '../../utils/errorHandler';

export async function createUserHandler(req: Request, res: Response) {
  try {
    const data = req.body;

    const user = await createUser(data);

    res.status(201).json(user);
  } catch (exception: unknown) {
    const message = errorHandler(exception);
    res.status(400).send({ message });
  }
}

export async function getAllUserHandler(req: Request, res: Response) {
  try {

    const users = await getAllUser();
    
    return res.status(202).json({ message: 'users has been found successfully', users });
  } catch (exception: unknown) {
    const message = errorHandler(exception);
    res.status(400).send({ message });
  }
};

export async function getUserHandler(req: AuthRequest, res: Response) {
  try {
    const { id } = req.user as User;

    const user = await getUserById(id);
  
    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }
  
    return res.json(user);
  } catch (exception: unknown) {
    const message = errorHandler(exception);
    res.status(400).send({ message });
  }
};

export async function deleteUserHandler(req: AuthRequest, res: Response) {
  try {
    const { id } = req.params;

    const user = await deleteUser(id);

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    res.status(200).send(user);
  } catch (exception: unknown) {
    const message = errorHandler(exception);
    res.status(400).send({ message });
  }
}

export async function updateUserHandler(req: AuthRequest, res: Response) {
  try {
    const { id } = req.params;
    
    const data = req.body;

    const user = await updateUser(id, data);

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    res.status(200).json(user);
  } catch (exception: unknown) {
    const message = errorHandler(exception);
    res.status(400).send({ message });
  }
}

